const Order = require("../../../models/api/v1/Order");

// function to create a new order
const create = (req, res) => {
    const name = req.body.order.name;
    const size = req.body.order.size;
    const color = req.body.order.color;
    const texture = req.body.order.texture;
    const image = req.body.order.image;

    const order = new Order({ 
        name: name,
        size: size, 
        color: color,
        texture: texture,
        image: image
    });
    
    order.save().then(() => {
        res.json({
            status: "success",
            data: {
                order: order,
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
        res.status(500).json({ status: "error", message: "Internal server error:", error: error.message });
    }
};

// function to get a single order with id
const show = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ status: "error", message: "Order not found" });
        } else {
            res.json({
                status: "success",
                data: {
                    order: order,
                },
            });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error:", error: error.message });
    }
};

module.exports = {
    create,
    index,
    show,
};