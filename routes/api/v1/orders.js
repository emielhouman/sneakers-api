const express = require("express");
const router = express.Router();
const orderController = require("../../../controllers/api/v1/orders");

router.post("/", orderController.create); // Create a new order
router.get("/", orderController.index); // Get all orders
router.get("/:id", orderController.show); // Get a single order with id
router.patch("/:id", orderController.updateStatus); // Update a single order with id
router.delete("/:id", orderController.destroy); // Delete a single order with id

module.exports = router;