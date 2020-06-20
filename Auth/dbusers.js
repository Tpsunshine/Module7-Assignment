const mongoose = require("mongoose");
var users = mongoose.Schema({
                    username: {type:String},
                    email: {type:String},
                    password:{type:String},
                    Admin:{type:Boolean}
                        }); 

module.exports = mongoose.model("shoppingusers",users);