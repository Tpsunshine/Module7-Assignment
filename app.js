const express = require("express");
const app = express();

var AuthController = require("./Auth/Loginregister");
app.use("/auth",AuthController);

var DashboardController = require("./Dashboard/shoppinglist");
app.use("/dashboard",DashboardController);

var ProductController = require("./Product/addproduct");
app.use("/admin/product", ProductController);

var UserController = require("./User/userslist");
app.use("/user",UserController);


// var Products = 

module.exports = app;
