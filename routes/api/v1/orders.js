const express = require("express");
const router = express.Router();
const orderController = require("../../../controllers/api/v1/orders");

router.post("/", orderController.create); // Create a new order
router.get("/", orderController.index); // Get all orders

module.exports = router;