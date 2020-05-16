const express = require("express");
const Router = express.Router();

// Validators
const { registerValidation, loginValidation } = require("../middleware/auth");

// Controllers
const authController = require("../controller/authController");

Router.post("/register", registerValidation, authController.registerController);
Router.post("/login", loginValidation, authController.loginController);
Router.post("/logout", authController.logoutController);

module.exports = Router;
