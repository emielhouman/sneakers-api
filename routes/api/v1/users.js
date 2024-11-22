const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/api/v1/users");

router.post("/", userController.create); // Create a new user
router.get("/", userController.index); // Get all users
router.post("/", userController.login); // Login user

module.exports = router;