const Order = require("../../../models/api/v1/Order");

const create = (req, res) => {
    const name = req.body.order.name;
    const size = req.body.order.size;
    const color = req.body.order.color;

    const o = new Order({ name: name, size: size, color: color });
    o.save().then(() => {
        res.json({
            status: "success",
            data: {
                order: o,
            },
        });
    });
};

// function to get all the orders
const index = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json({
            status: "success",
            data: {
                orders: orders,
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