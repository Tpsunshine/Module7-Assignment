const mongoose = require("mongoose");
const products = mongoose.Schema({
                            productname:{type:String},
                            details:{type:String},
                            price:{type:Number}
                                    });


module.exports = mongoose.model("product",products);