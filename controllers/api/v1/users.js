require("dotenv").config();
const User = require("../../../models/api/v1/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Function to create a new user
const create = (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            res.status(500).json({ status: "error", message: "Internal server error", error: err.message });
        }

        const user = new User({ email: email, password: hashedPassword });
        user.save().then(() => {
            res.json({
                status: "success",
                data: {
                    user: user,
                },
            });
        });
    });
};

// Function to get all the users
const index = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({
            status: "success",
            data: {
                users: users,
            },
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
};

// Function to handle user login
const login = async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).json({ status: "error", message: "Invalid email or password" });
        }

        // Compare the submitted password with the hashed password in db
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ status: "error", message: "Invalid email or password" });
        }

        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({
            status: "success",
            data: {
                token: token,
            },
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
};

module.exports = {
    create, 
    index,
    login,
};