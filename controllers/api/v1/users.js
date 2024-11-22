const User = require("../../../models/api/v1/User");

const create = (req, res) => {
    const username = req.body.user.username;
    const password = req.body.user.password;

    const user = new User({ username: username, password: password });
    user.save().then(() => {
        res.json({
            status: "success",
            data: {
                user: user,
            },
        });
    });
};

// function to get all the users
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

// function to login a user
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    create, 
    index,
    login,
};