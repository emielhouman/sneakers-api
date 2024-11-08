const mongoose = require("mongoose");
const User = mongoose.model("Order", { 
    username : String,
    password: String,
});

module.exports = User;