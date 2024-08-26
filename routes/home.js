const express = require("express");
const route = express.Router();
const homeController = require("../controller/client/homeController.js");
const authController = require("../controller/authController.js");
const serviceClientController = require("../controller/client/serviceClientController.js")

route.post('/register', authController.register);
route.post("/login", authController.login);
route.get('/logout', authController.logout);

route.get("/login", authController.show_login_client);
route.get("/register", authController.show_register_client);
route.get("/wishlist_add/:id", serviceClientController.add_wishlist );
route.get("/wishlist_delete/:id", serviceClientController.delete_wishlist)
route.get("/wishlists", homeController.wishlist);
route.get("/contact", homeController.contact);
route.get("/product/:id", homeController.product);
route.get("/products", homeController.products);
route.get("/home3", homeController.home3);
route.get("/home2", homeController.home2);
route.post("/cart_add", serviceClientController.add_cart );
route.post('/checkout', serviceClientController.checkout);
route.get("/cart_delete/:id", serviceClientController.delete_cart);
route.get("/cart", homeController.cart);
route.get("/blog/:id", homeController.blog);
route.get("/blogs", homeController.blogs);
route.get("/about", homeController.about);
route.get("",homeController.index);
module.exports = route;
