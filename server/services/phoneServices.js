const { User } = require("../model/User");
const { TwilioService } = require("../middleware/twillo");

class PhoneServices {
   sendOTP(phoneData) {
      const { phone } = phoneData;
      let isNewUser = true;

      return new Promise(async (resolve, reject) => {
         try {
            const data = await User.findOne({ phone });
            if (data) isNewUser = false;

            // TWILIO SERVICE

            const twilio = await TwilioService.sendOTPCode(phoneData);

            resolve({ phoneNum: twilio });
         } catch (err) {
            reject(err.message);
         }
      });
   }
   verifyOTP(phoneData) {
      const { phone } = phoneData;

      let isNewUser = true;

      return new Promise(async (resolve, reject) => {
         try {
            const userExist = await User.findOne({ phone });

            // TWILIO SERVICE

            const twilio = await TwilioService.verifyOTPCode(phoneData);

            if (userExist) {
               isNewUser = false;

               userExist.generateToken((err, user) => {
                  if (err) throw err;

                  resolve({ isNewUser, token: user.token });
               });
            } else {
               resolve({ isNewUser });
            }
         } catch (err) {
            reject(err.message);
         }
      });
   }
}

module.exports = new PhoneServices();
