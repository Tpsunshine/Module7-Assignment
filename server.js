const express = require("express");
const app = require("./app");
const chalk = require("chalk");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Edu-training:<Z45$gcazhpq>@cluster0.rsz3c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
app.set("view engine","ejs");
app.set("views","./views");
app.use(express.static(__dirname+"/public"));
const port = process.env.PORT || 8080; 



app.get("/",(req,res)=>{
    console.log("Actual Function");
    res.render("loginpage",{invalid: req.query.valid?req.query.valid:""});
});

app.listen(port,()=>{
    console.log(chalk.blue("App isrunning on port 8080"));
});
