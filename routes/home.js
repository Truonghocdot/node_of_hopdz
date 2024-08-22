const express = require("express");
const route = express.Router();
const authController = require('../controller/client/homeController.js')
route.get("/wishlist", authController.wishlist);
route.get("/contact", authController.contact);
route.get("/product/:id", authController.product);
route.get("/products", authController.products);
route.get("/home3", authController.home3);
route.get("/home2", authController.home2);
route.get("/cart", authController.cart);
route.get("/blog/:id", authController.blog);
route.get("/blogs", authController.blogs);
route.get("/about", authController.about);
route.get("",authController.index);
module.exports = route;
