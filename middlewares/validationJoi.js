/* eslint-disable semi */
/* eslint-disable quotes */
const Joi = require("joi");

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),

      phone: Joi.number().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
};
