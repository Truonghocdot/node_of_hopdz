const express = require("express");
const route = express.Router();
const dashboardController = require("../controller/admin/dashboardController")
route.get("/products", dashboardController.products);
route.get("/orders", dashboardController.orders);
route.get("/blogs", dashboardController.blogs);
route.get("/categories", dashboardController.categories);

route.get("/",dashboardController.index);

module.exports = route