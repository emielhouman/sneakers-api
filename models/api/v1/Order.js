const mongoose = require("mongoose");
const Order = mongoose.model("Order", { 
    name : String,
    size: String,
    color: String,
});

module.exports = Order;