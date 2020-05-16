const bcrypt = require("bcryptjs");
const AuthServices = require("../services/authServices");

const registerController = async (req, res, next) => {
   const hashedPass = bcrypt.hashSync(req.body.password);
   req.body.password = hashedPass;
   try {
      await AuthServices.saveDetails(req.body);
      res.status(200).send({
         success: true,
         message: "User Created Successfully!!",
      });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

const loginController = async (req, res, next) => {
   try {
      const user = await AuthServices.loginUser(req.body);
      res.send({ success: true, id: user._id, token: user.token });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

const logoutController = async (req, res, next) => {
   try {
      const user = await AuthServices.logoutUser(req.body);
      res.send({ success: true, message: "Logout Successfully" });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

module.exports = {
   registerController,
   loginController,
   logoutController,
};
