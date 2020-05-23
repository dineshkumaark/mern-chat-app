const express = require("express");
const Router = express.Router();

// Validators
const {
   phoneOTPValidation,
   phoneVerifyValidation,
} = require("../middleware/phone");

// Controllers
const phoneController = require("../controller/phoneController");

Router.post(
   "/sendcode",
   phoneOTPValidation,
   phoneController.phoneOTPController
);
Router.post(
   "/verify",
   phoneVerifyValidation,
   phoneController.phoneVerifyController
);

module.exports = Router;
