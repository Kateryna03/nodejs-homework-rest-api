/* eslint-disable semi */
/* eslint-disable quotes */
const Joi = require("joi");

module.exports = {
  addUserValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),

      password: Joi.string().min(8).required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: validationResult.error.message,
      });
      return; // не забывать возврашать при ошибке валидации, чтобы не попадал невалидный контакт в базу
    }
    next();
  },
};