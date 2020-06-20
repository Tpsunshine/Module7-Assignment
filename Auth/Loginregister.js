const express = require("express");
const router = express.Router();
const db = require("./dbusers");
const bodyparser = require("body-parser");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const config = require("../config");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const jwt = require("jsonwebtoken");
const rolecheck = require("../Auth/rolecheck");


router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());


router.post("/login",(req,res)=>{
    console.log("Entered Router Post");
    console.log(req.body.email);
    db.findOne({'email':req.body.email},(err,data)=>{
        console.log("The data from the db is ",data);
        if(data != null){
                const passwordvalid = bcrypt.compareSync(req.body.password,data.password); 
                console.log(chalk.blue(passwordvalid));
                if(passwordvalid){
                    var token = jwt.sign({id:data._id},config.secret,{expiresIn: 86400});
                    localStorage.setItem('authtoken',token);

                    res.redirect("/auth/shoppinglist");
                }
                else{
                    const validmsg = encodeURIComponent("Email address or password is invalid");
                    res.redirect("/?valid="+validmsg);
                }
        }
        else{
            const validmsg = encodeURIComponent("Email address or password is invalid");
            res.redirect("/?valid="+validmsg);
        }
    });

});

router.get("/register",(req,res)=>{
    res.render("register",{error:req.query.invalid?req.query.invalid:""});
});

router.post("/registered",(req,res)=>{

    db.collection.findOne({email:req.body.email},(err,data)=>{
        
        console.log("The Data after registration"); 
        console.log(req.body.email);
        console.log(data);
        
        if(data==null){
            var bcryptedpassword =  bcrypt.hashSync(req.body.password,8);
            db.create({username:req.query.username,email:req.body.email,password:bcryptedpassword, Admin:false},(err,data)=>{
                console.log("The data entered in the db is ");
                console.log(data);
                var valid = encodeURIComponent("Successfully registered Please Login");
                res.redirect("/?valid="+valid);
            });
        }
        else{
            console.log("Email ID already exists");
            const emailalreadyexist = encodeURIComponent("Email ID already exists"); 
            res.redirect("/auth/register?invalid="+emailalreadyexist);
        }

    });

});

router.get("/shoppinglist",(req,res)=>{
    token = localStorage.getItem("authtoken");
    
    if(!token){
        res.redirect("/");
    }

    jwt.verify(token,config.secret,(err,decoded)=>{
        console.log("entered JWT token callback");
        if(err){
            console.log("entered error");
            res.redirect("/");
        }
    
        db.findById(decoded.id,(err,data)=>{
            console.log("found user By ID");
            if(err){
                console.log("entered error");
                res.redirect("/");
            }
            if(!data){
                res.redirect("/");
            }
            else{
                        res.redirect("/dashboard/admin"); 
                }
        });


    });


});



module.exports = router;