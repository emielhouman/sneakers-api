const mongoose = require("mongoose");
const Order = mongoose.model("Order", { 
    sneaker: String,
    size: Number,
    price: Number,
    amount: Number,
    image: String,
    sneakerConfigs: Array,
    firstname: String,
    lastname: String,
    email: String,
    telephone: String,
    address: Array,
    payment: Array,
    date: String, 
    status: String,
});

module.exports = Order;