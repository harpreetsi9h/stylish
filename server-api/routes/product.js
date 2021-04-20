const { error } = require("console");
const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.post("/add", (req, res) => {
    const newProduct = Product({
        ...req.body
    });
    newProduct
        .save()
        .then((order) => {
            res.status(200).json({ data: req.body, message: "Product Crrated" });
        })
        .catch((error) => {
            res.status(500).json({ error: error, message: "Product not Crrated" });
        });
});

router.post("/get", (req, res) => {
    Product.find({...req.body })
        .sort({ createdAt: -1 })
        .then((orders) => {
            res.status(200).json({ message: "Product List", data: orders });
        })
        .catch((error) => {
            res.status(500).json({ error: error, message: "No Product List" });
        });
});

router.get("/get/:id", (req, res) => {
    Product.findById(req.params.id)
        .then((order) => {
            if (!order) return res.status(500).send("No product found");
            res.status(200).json({ data: order, message: "Product Details" });
        })
        .catch((error) => {
            res.status(500).json({ error: error, message: "No Product found" });
        });
})

router.post("/edit", (req, res) => {
    const data = {...req.body };

    Product.findByIdAndUpdate(data.productId, {...data, productId: null }, { new: true })
        .then((order) => {
            if (!order) return res.status(500).send(err);
            res.status(200).json({ data: req.body, message: "Product Updated" });
        })
        .catch((error) => {
            res.status(500).json({ error: error, message: "Product not Updated" });
        });
})

router.get("/delete/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((err, order) => {
            res.status(200).json({ data: {}, message: "Product Deleted" });
        })
        .catch((error) => {
            res.status(500).json({ error: error, message: "Product not Deleted" });
        });
})
module.exports = router;