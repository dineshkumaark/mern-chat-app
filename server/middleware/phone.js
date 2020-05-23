const Joi = require("@hapi/joi");

const phoneOTPValidation = (req, res, next) => {
   const schema = Joi.object({
      phoneCode: Joi.string()
         .regex(/^\+[0-9]{1,3}$/)
         .required(),
      phone: Joi.string()
         .regex(/^[0-9]{4,13}$/)
         .required(),
   });

   const { error } = schema.validate(req.body);

   if (error)
      return res.status(400).json({ success: false, message: error.message });

   next();
};

const phoneVerifyValidation = (req, res, next) => {
   const schema = Joi.object({
      phoneCode: Joi.string()
         .regex(/^\+[0-9]{1,3}$/)
         .required(),
      phone: Joi.string()
         .regex(/^[0-9]{4,13}$/)
         .required(),
      code: Joi.string().max(4),
   });

   const { error } = schema.validate(req.body);

   if (error)
      return res.status(400).json({ success: false, message: error.message });

   next();
};

module.exports = {
   phoneOTPValidation,
   phoneVerifyValidation,
};
