const Order = require("../../../models/api/v1/Order");

// function to create a new order
const create = (req, res) => {
    const sneaker = req.body.order.sneaker;
    const size = req.body.order.size;
    const price = req.body.order.price;
    const amount = req.body.order.amount;
    const image = req.body.order.image;
    const configs = req.body.order.sneakerConfigs;
    const firstname = req.body.order.firstname;
    const lastname = req.body.order.lastname;
    const email = req.body.order.email;
    const telephone = req.body.order.tel;
    const address = req.body.order.address;
    const payment = req.body.order.payment;
    const status = req.body.order.status;

    const date = new Date();
    date.setHours(date.getHours() + 1);
    const updatedDate = date.toJSON();
    
    const order = new Order({ 
        sneaker: sneaker,
        size: size,
        price: price,
        amount: amount,
        image: image, 
        sneakerConfigs: configs,
        firstname: firstname,
        lastname: lastname,
        telephone: telephone,
        email: email,
        address: address,
        payment: payment,
        date: updatedDate,
        status: status,
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

// function to update a single order with id
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { order } = req.body;

        if (!order || !order.status) {
            return res.status(400).json({ status: "error", message: "Status is required" });
        }
        const updatedOrder = await Order.findByIdAndUpdate(id, {status: order.status}, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ status: "error", message: "Order not found" });
        } else {
            res.json({
                status: "success",
                data: {
                    order: updatedOrder,
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error:", error: error.message });
    }
};

// function to delete a single order with id
const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
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
    updateStatus,
    destroy
};