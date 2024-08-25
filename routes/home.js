const express = require("express");
const route = express.Router();
const authController = require("../controller/authController.js");
const homeController = require("../controller/client/homeController.js");
route.post("/register", authController.register);
route.post("/logout", authController.logout);
route.post("/login", authController.login);
route.get("/wishlist", homeController.wishlist);
route.get("/contact", homeController.contact);
route.get("/product/:id", homeController.product);
route.get("/products", homeController.products);
route.get("/home3", homeController.home3);
route.get("/home2", homeController.home2);
route.get("/cart", homeController.cart);
route.get("/blog/:id", homeController.blog);
route.get("/blogs", homeController.blogs);
route.get("/about", homeController.about);
route.get("",homeController.index);
module.exports = route;
