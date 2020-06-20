const jwt = require("jsonwebtoken");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const config = require("../config");
const db = require("./dbusers");
const product = require("../Product/product");
const chalk =require("chalk");
 

 function userID(Callback){
    var token = localStorage.getItem("authtoken");
    var userid;
       jwt.verify(token,config.secret,(err,decoded)=>{
        if(err) throw err;
        console.log("decoded code is ");
        console.log(typeof decoded);
        Callback(decoded);
    });
};


function productdetails(callback2){
    product.find({},(err,data)=>{
        if(err) throw err;

        else{

            if(data==[]){
                
            console.log(chalk.blue("Data blank is "));
            console.log(data);
                callback2("no data found")
            }
            else{
                console.log(chalk.blue("Data else is "));
                console.log(data);
                callback2(data)
            }
        }
        
    })
}


function rolecheck(req,res,next){
    var token = localStorage.getItem("authtoken");
    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err) return res.status(401).send({message:"Access denied"});
        console.log("decoded code is ");
        console.log(decoded);
        db.findById(decoded.id,(err,data)=>{
            if(err){
                console.log("There is an error");
                return res.status(500).send({message:"Access denied"});
            }
            if(!data.Admin){
                return res.redirect("/dashboard/admin");
            }
            else if(data.Admin==false){
                return res.redirect("/dashboard/admin");

            }
            else{
                next();
            }
    
        })

    })
    
}

module.exports = {rolecheck,userID,productdetails};