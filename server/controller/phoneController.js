const phoneServices = require("../services/phoneServices");

const phoneOTPController = async (req, res, next) => {
   try {
      const { phoneNum } = await phoneServices.sendOTP(req.body);

      res.send({
         success: true,
         message: `OTP send to ${phoneNum.to} successfully`,
      });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

const phoneVerifyController = async (req, res, next) => {
   try {
      const { isNewUser = false, token } = await phoneServices.verifyOTP(
         req.body
      );

      res.send({
         success: true,
         message: `OTP Verified successfully`,
         isNewUser,
         token,
      });
   } catch (err) {
      let twilioError = process.env.TWILOERROR;

      let ErrorMsg =
         err === twilioError ? "Please Enter a Valid Phone Number" : err;

      let ErrorStatus = err === twilioError ? 404 : 400;

      res.status(ErrorStatus).send({ success: false, message: ErrorMsg });
   }
};

module.exports = {
   phoneOTPController,
   phoneVerifyController,
};
