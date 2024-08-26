const express = require("express");
const route = express.Router();
const dashboardController = require("../controller/admin/dashboardController");
const authController = require("../controller/authController.js");
route.get("/login", authController.show_login_admin);
route.get("/register", authController.show_register_admin);

route.get("/products", authController.checkRoleAdmin, dashboardController.products);
route.post("/product/add", authController.checkRoleAdmin, dashboardController.upload.single('image'), dashboardController.add_product);
route.delete("/product/delete", authController.checkRoleAdmin, dashboardController.delete_product);
route.patch("/product/edit", authController.checkRoleAdmin, dashboardController.upload.single('image'), dashboardController.edit_product);
route.get("/orders", authController.checkRoleAdmin, dashboardController.orders);
route.get("/blogs", authController.checkRoleAdmin, dashboardController.blogs);
route.get("/categories", authController.checkRoleAdmin, dashboardController.categories);
route.post("/catogory/add", authController.checkRoleAdmin, dashboardController.add_category);
route.delete("/category/delete", authController.checkRoleAdmin, dashboardController.delete_category);
route.patch("/category/edit", dashboardController.edit_category);
route.get("/", authController.checkRoleAdmin, dashboardController.index);
module.exports = route