const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');


const app = express()
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');
const { response } = require("express");
const dbURI = "mongodb+srv://Angular:angular123@finalprojectdb.ln07q.mongodb.net/Angular-api?retryWrites=true&w=majority"
   

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "Api working fine" })
})
app.use('/api/auth', authRoute)
app.use('/api/order', orderRoute)
app.use('/api/product', productRoute)


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => { console.error(err) })
db.once("open", () => { console.log("DB started successfully") })

app.listen(2400, () => { console.log("Server started: 2400") })