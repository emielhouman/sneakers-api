const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/api/v1/users");

router.post("/", userController.create); // Create a new user
router.get("/", userController.index); // Get all the users
router.post("/login", userController.login); // Login a user
router.patch("/password", userController.updatePassword); // Update password of a user

module.exports = router;