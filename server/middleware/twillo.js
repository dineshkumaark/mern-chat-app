const twilio = require("twilio");

require("dotenv").config();

const TwilioAccountId = process.env.TWILOACCOUNTID;
const TwilioAuthToken = process.env.TWILOAUTHTOKEN;
const TwilioVerifyId = process.env.TWILOVERIFYID;

const client = require("twilio")(TwilioAccountId, TwilioAuthToken);

class TwilioServiceClass {
   sendOTPCode({ phone, phoneCode }) {
      let phoneNum = phoneCode + phone;
      return new Promise(async (resolve, reject) => {
         try {
            // resolve(phoneNum);
            client.verify
               .services(TwilioVerifyId)
               .verifications.create({ to: phoneNum, channel: "sms" })
               .then((verification) => {
                  // console.log(verification.status);
                  const { status, to } = verification;
                  resolve({ status, to });
               })
               .catch((err) => {
                  console.log(err);

                  reject(err);
               });
         } catch (err) {
            console.log(err.message);
            reject(err);
         }
      });
   }

   verifyOTPCode({ phone, phoneCode, code }) {
      let phoneNum = phoneCode + phone;

      return new Promise(async (resolve, reject) => {
         try {
            client.verify
               .services(TwilioVerifyId)
               .verificationChecks.create({ to: phoneNum, code })
               .then((verification) => {
                  const { status, to, valid } = verification;
                  if (valid) {
                     resolve({ status, to, valid });
                  } else {
                     throw new Error("Please Enter a Valid OTP");
                  }
               })
               .catch((err) => {
                  console.log(err);
                  reject(err);
                  throw new Error(err);
               });
         } catch (err) {
            console.log(err);

            reject(err);
         }
      });
   }
}

module.exports = {
   TwilioService: new TwilioServiceClass(),
};
