const mongoose = require("mongoose");
const Order = mongoose.model("Order", { 
    name : String,
    size: String,
    color: String,
    texture: String,
    image: String
});

module.exports = Order;