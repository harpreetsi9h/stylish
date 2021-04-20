const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const rounds = 10

const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

const middleware = require('../middlewares')

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.email })
        .then(user => {
            if (!user) res.status(404).json({ error: 'no user with that email found' })
            else {
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) res.status(500).json(error)
                    else if (match) res.status(200).json({ token: generateToken(user), ...user._doc })
                    else res.status(403).json({ error: 'passwords do not match' })
                })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.post('/signup', async(req, res) => {
    const isAvail = await User.count({ email: req.body.email });
    if (parseInt(isAvail) > 0) {
        return res.status(500).json({ message: "Email already exist" })
    }

    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) res.status(500).json(error)
        else {
            const newUser = User({...req.body, password: hash })
            newUser.save()
                .then(user => {
                    res.status(200).json({ token: generateToken(user), ...req.body })
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        }
    })
});

router.get('/jwt-test', middleware.verify, (req, res) => {
    res.status(200).json(req.user)
})

function generateToken(user) {
    return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' })
}

module.exports = router