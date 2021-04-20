const { error } = require("console");
const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.post("/create", (req, res) => {
    const newOrder = Order({
        ...req.body,
        orderNo: Math.floor(10000 + Math.random() * 90000),
    });
    newOrder
        .save()
        .then((order) => {
            res.status(200).json({ data: req.body, message: "Order Created" });
        })
        .catch((error) => {
            res.status(500).json({ error: error, message: "Order not Created" });
        });
});

router.get("/get/:id", (req, res) => {
    const id = req.params.id;
    Order.find({ userId: id })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("users")
        .then((orders) => {
            res.status(200).json({ message: "Order List", data: orders });
        })
        .catch((error) => {
            res.status(500).json({ error: error, message: "No Order List" });
        });
});

module.exports = router;