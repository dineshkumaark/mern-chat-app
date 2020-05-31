const Joi = require("@hapi/joi");

const registerValidation = (req, res, next) => {
   const schema = Joi.object({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(1).required(),
      gender: Joi.string().regex(/^(male|female|others)$/i),
      email: Joi.string().max(100).email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9!@#$&()\\-`.+,\/"]{3,30}$/),
      phone: Joi.string()
         .regex(/^[0-9]{4,13}$/)
         .required(),
      phoneCode: Joi.string()
         .regex(/^\+[0-9]{1,3}$/)
         .required(),
   });

   const { error } = schema.validate(req.body);

   if (error)
      return res.status(400).json({ success: false, message: error.message });

   next();
};

const loginValidation = (req, res, next) => {
   const schema = Joi.object({
      email: Joi.string().max(100).email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9!@#$&()\\-`.+,\/"]{3,30}$/),
   });

   const { error } = schema.validate(req.body);

   if (error)
      return res.status(400).json({ success: false, message: error.message });

   next();
};

module.exports = {
   registerValidation,
   loginValidation,
};
