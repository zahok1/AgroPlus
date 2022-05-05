var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
const Product = require('../../Models/Product.js');
const protect = require('../../Middleware/Auth.js');
const { default: mongoose } = require('mongoose');

const product = express.Router();

// GET ALL PRODUCT
product.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // Product.create({ "name": "Papaya", "image": "papaya.jpg", "price": 2000, "category": "Fruits", "countInStock": 6, "description": "Grown in Quedus Farms" }).then(res => {
    //   console.log(res)
    // })

    // console.log(products)
    res.status(200).json({ products });
    // res.json({ "message": "hi" })
  })
);

// GET SINGLE PRODUCT
product.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // console.log(req.params)
    const product = await Product.findById(req.params.id)
      .then((productDetail) => res.json({ product: productDetail }))
      .catch(err => res.status(404).json({ message: err }));
    // if (product) {
    //   res.json({ product });
    // } else {
    //   res.status(404).json({ message: "Could not find product" });
    //   // throw new Error("Product not Found");
    // }
  })
);
module.exports = product;