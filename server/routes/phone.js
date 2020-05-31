const express = require("express");
const Router = express.Router();

const multer = require("multer");

const upload = multer();

const DropboxController = require("../middleware/dropbox");

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

Router.post("/upload", upload.single("file"), async (req, res, next) => {
   const { file } = req;
   try {
      const dropbox = await DropboxController.uploadFile(file);
      res.send({ success: true, message: dropbox });
   } catch (err) {
      res.send({ success: false, message: err.message });
   }
});

module.exports = Router;
