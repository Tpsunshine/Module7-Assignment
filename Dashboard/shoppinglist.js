const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const db = require("../Auth/dbusers");
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const config = require("../config");
const _ = require("lodash");
const chalk = require("chalk");
const rolecheck = require("../Auth/rolecheck");
// const role = require("role");
const product = require("../Product/product");
const ObjectID = require('mongodb').ObjectID;
var token;
router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());


router.get("/admin",(req,res)=>{
////////////////////*******getting the return value from the callback ********\\\\\\\\\\\\\\\\\\\\\\\\\
    rolecheck.userID((userID)=>{
        console.log("The Value from the callback is");
        db.findById((userID.id),(err,data)=>{
            console.log(userID.id);
            console.log(chalk.magenta(data));
            if(!data.Admin){
                rolecheck.productdetails((products)=>{     
                    res.render("homepage",{admin:false,details:products});
                })
            }
            else{
                rolecheck.productdetails((products)=>{     
                    res.render("homepage",{admin:true,details:products});
                })
            }
        })
    });
})

router.put("/orderproduct",(req,res)=>{

    console.log("The name of the Product is ");
    console.log(chalk.green(req.body.productname));
    var orderdetails= {productname:req.body.productname,
                        productprice: req.body.productprice,
                        producrdetails:req.body.productdetails,
                        productcount: parseInt(req.body.productcount)};

        countofproduct = req.body.productcount;
    rolecheck.userID((userID)=>{
        db.findById((userID.id),(err,data)=>{

                var array = Object.keys(data.toJSON());
                var orderexist = false;
                if(err){
                    console.log("no values are present");
                }
                else{
                    console.log(chalk.yellow(data));
                    }
            for(var i=0;i<array.length;i++){
                if(array[i]=="orders"){
                    orderexist =true;
                }
            }

            var shoppingdata = data.toJSON();

            if(orderexist){
                var productexist = false;
                for(var j=0;j<shoppingdata.orders.length;j++){
                    if(shoppingdata.orders[j].productname==req.body.productname){
                        productexist = true;
                        break;
                    }
                };
                console.log("Product exists: ",productexist)
                
                if(productexist==false){
                db.collection.update({"_id":ObjectID(userID.id)},{$push:{orders:{productname:req.body.productname,
                    productprice: req.body.productprice,
                    producrdetails:req.body.productdetails,
                    productcount: parseInt(req.body.productcount)}}},{upsert:true},()=>{
                    res.send("success, inserted");
                });
                }
                else{  
                    db.collection.update({"_id":ObjectID(userID.id)},{$inc:{"orders.$[elem].productcount":parseInt(countofproduct)}},{arrayFilters:[{"elem.productname":req.body.productname}]},
                    (err,data)=>{
                        console.log("the count of the product is updated");
                        res.send("success, updated");
                    });
                }
                


            }
            else{
                console.log(chalk.red("Orders Does not exist")); 
                db.collection.update({ "_id" : ObjectID(userID.id)},{$set:{orders:[orderdetails]}},{upsert:true},(err,mydata)=>{
                    console.log(chalk.yellow(mydata));
                    res.send("success, inserted");
                        });
            }

    })
    
    });

});

router.get("/myorders",(req,res)=>{
    rolecheck.userID((userid)=>{
        db.findById((userid.id),(err,data)=>{
            console.log(chalk.yellow(data));
            var myArray = Object.keys(data.toJSON());
            var ordersexist = false;
            for(var i=0;i<myArray.length;i++){
                if(myArray[i]=="orders"){
                    ordersexist = true;
                }
            }
            if(ordersexist!=true){
                res.send("noorders");
            }
            else{
                var myobj = data.toJSON();
                res.send(myobj.orders);
            }
        });
    });
});


module.exports = router;