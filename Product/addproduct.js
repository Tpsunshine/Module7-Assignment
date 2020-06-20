const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const db = require("../Auth/dbusers");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const config = require("../config");
const fetch = require("node-fetch");
const chalk = require("chalk");
const rolecheck = require("../Auth/rolecheck");
// const role = require("role");
const product = require("./product");
const baseurl = "http://localhost:8080";
router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());

router.get("/getproducts",rolecheck.rolecheck,(req,res)=>{
    product.find({},(err,data)=>{
        console.log(chalk.blue("data is "));
        console.log(data);
        if(err) throw err;
        if(data==[]){
            console.log("data is not present");
           res.status(500).json({msg: "No Data Found"});
        }
        else{
            console.log("data is sent here");
            res.send(data);
        }

});

});
router.get("/showproduct",rolecheck.rolecheck,(req,res)=>{

    fetch(baseurl+"/admin/product/getproducts").then((data)=>data.json()
    ).then((details)=>{
        res.render("addpro",{details:details, admin:true});
    });
});

router.put("/addproduct",rolecheck.rolecheck,(req,res)=>{
    console.log("Entered add product put");
    console.log(req.body.productname);
    if(req.body.productname=="" || req.body.price=="" || req.body.details==""){
        res.send("Please enter complete product details");
    }
    else{
            product.collection.insert({productname:req.body.productname,details: req.body.details,price:req.body.price},(err,data)=>{
                console.log("The product inserted in db is ");
                res.send(data.ops[0]);
                
            });
    }
});



module.exports = router;