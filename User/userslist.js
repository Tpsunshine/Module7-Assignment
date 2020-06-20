const express = require("express");
const router = express.Router();
const db = require("../Auth/dbusers");
const bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());
const rolecheck = require("../Auth/rolecheck");
const chalk = require("chalk");
const bcrypt = require("bcrypt");

router.get("/userslist",rolecheck.rolecheck,(req,res)=>{
    console.log("The Data from Magenta is");
    db.find({},(err,data)=>{
        console.log(chalk.magenta(data));
        res.render("adduser",{admin:true,details:data});
    });

});

router.put("/adduser",(req,res)=>{
    console.log("put user addition");
    if(req.body.username =="" || req.body.email=="" ||req.body.password=="" || req.body.Admin==""){
        res.send("Please enter all the details");
    }
    else{
        db.find({},(err,data)=>{
            var emailidexist = false;
            console.log("Email ID is ",req.body.email);
            for(var i =0;i<data.length;i++){
                console.log(data[i].email);
                if(data[i].email == req.body.email){
                    emailidexist = true;
                    break;
                }
            }
            if(emailidexist ==true){
                res.send("Email ID already exists");
            }
            else{
                var Adminboolean;
                if(req.body.Admin=="true"){
                    Adminboolean = true;
                }
                else{
                    Adminboolean = false;
                }
                var bcryptpassword = bcrypt.hashSync(req.body.password,8);
                db.collection.insert({email:req.body.email,password:bcryptpassword,Admin:Adminboolean},(err,data)=>{
                    console.log(data);
                    res.send(data);
                });
            }
          


        })
    }
});


module.exports = router;