const mongoose = require("mongoose");
const UserModel = require("./user");

const model = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderNo: {
        type: Number,
    },
    items: [{
        id: Number,
        name: String,
        price: Number,
        qty: Number,
        total: Number,
        image: String,
    }, ],
    total: String,
}, { timestamps: true });

module.exports = new mongoose.model("Order", model);