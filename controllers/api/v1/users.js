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

module.exports = {
    create, 
    index,
};