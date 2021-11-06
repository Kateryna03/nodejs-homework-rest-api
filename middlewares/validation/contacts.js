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
      favorite: {
        type: Boolean,
        default: false,
      },
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
// const schemaAddNewCon = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).required(),

//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net", "ua"] },
//     })
//     .required(),

//   phone: Joi.number().required(),
// });

// const validation = (schema) => {
//   return async (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       res.status(400).json({
//         status: "error",
//         code: 400,
//         message: error.message,
//       });
//       return;
//     }
//     next();
//   };
// };

// module.exports = {
//   validation,
//   schemaAddNewCon,
// };
