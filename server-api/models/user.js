    const mongoose = require('mongoose')

    const model = mongoose.Schema({
        username: {
            type: String,
            required: [true, "Username required"],
            //unique: [true, "username must be unique"]
        },
        password: {
            type: String,
            required: [true, "Password required"],
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        }
    });

    module.exports = new mongoose.model("User", model)