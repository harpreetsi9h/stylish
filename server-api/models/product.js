const mongoose = require("mongoose");

const model = mongoose.Schema({
    name: { type: String },
    reviews: { type: Number, default:24 },
    rating: { type: Number, default:5 },
    price: { type: Number },
    qty: { type: Number, default:1 },
    category: { type: String, default:'men' },
    image:{ type: String, default:"https://bootstrap-ecommerce.com/bootstrap-ecommerce-html/images/items/2.jpg"}
}, { timestamps: true });

module.exports = new mongoose.model("Product", model);
