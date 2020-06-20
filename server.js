const express = require("express");
const app = require("./app");
const chalk = require("chalk");
const mongoose = require("mongoose");
// mongodb+srv://Balaraju_Sarikonda:<password>@cluster0-0yd7x.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://Balaraju_Sarikonda:Chiru234@cluster0-0yd7x.mongodb.net/shoppingsite?retryWrites=true&w=majority");
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static(__dirname+"/public"));



app.get("/",(req,res)=>{
    console.log("Actual Function");
    res.render("loginpage",{invalid: req.query.valid?req.query.valid:""});
});

app.listen(8080,()=>{
    console.log(chalk.blue("App isrunning on port 8080"));
});