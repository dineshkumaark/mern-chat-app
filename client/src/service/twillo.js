const twilio = require("twilio");

require("dotenv").config();

const TwilioAccountId = process.env.TWILOACCOUNTID;
const TwilioAuthToken = process.env.TWILOAUTHTOKEN;
const TwilioVerifyId = process.env.TWILOVERIFYID;

const client = require("twilio")(TwilioAccountId, TwilioAuthToken);

class TwilioServiceClass {
   sendOTPCode({ phone, phoneCode }) {
      let phoneNum = phone + phoneCode;
      return new Promise(async (resolve, reject) => {
         try {
            resolve(phoneNum);
            // client.verify
            //    .services(TwilioVerifyId)
            //    .verificationChecks.create({ to: phoneNum, channel: "sms" })
            //    .then((verification) => {
            //       console.log(verification.status);
            //       resolve(verification.status);
            //    });
         } catch (err) {
            reject(err.message);
         }
      });
   }

   verifyOTPCode({ phone, phoneCode, code }) {
      let phoneNum = phone + phoneCode;
      return new Promise(async (resolve, reject) => {
         try {
            client.verify
               .services(TwilioVerifyId)
               .verificationChecks.create({ to: phoneNum, code })
               .then((verification) => {
                  console.log(verification.status);
                  resolve(verification.status);
               });
         } catch (err) {
            reject(err.message);
         }
      });
   }
}

export const TwilioService = new TwilioServiceClass();
