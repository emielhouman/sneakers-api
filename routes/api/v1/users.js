const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/api/v1/users");

router.post("/", userController.create); // Create a new user
router.get("/", userController.index); // Get all users

module.exports = router;