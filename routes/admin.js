const express = require("express");
const route = express.Router();
const dashboardController = require("../controller/admin/dashboardController")
route.get("/products", dashboardController.products);
route.post("/product/add", dashboardController.upload.single('image'), dashboardController.add_product);
route.delete("/product/delete", dashboardController.delete_product);
route.patch("/product/edit", dashboardController.upload.single('image'), dashboardController.edit_product);
route.get("/orders", dashboardController.orders);
route.get("/blogs", dashboardController.blogs);
route.get("/categories", dashboardController.categories);
route.post("/catogory/add", dashboardController.add_category);
route.delete("/category/delete", dashboardController.delete_category);
route.patch("/category/edit", dashboardController.edit_category);
route.get("/", dashboardController.index);

module.exports = route