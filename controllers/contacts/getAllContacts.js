/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
//const listContacts = require("../../model/contacts/listContacts");
const { Contact } = require("../../db");
//const { addPostValidation } = require("../middlewares/validationJoi");

const getAllContacts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { _id } = req.user;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find(
      { owner: _id },
      "_id name phone email owner",
      { skip, limit: +limit }
    ).populate("owner", "_id email");

    res.status(200).json({ contacts, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = getAllContacts;
// const sendSuccessRes = (res, data, status = 200) => {
//   res.status(status).json({
//     status: "success",
//     code: status,
//     data,
//   });
// };
// const getAll = async (req, res) => {
//   const result = await listContacts();
//   sendSuccessRes(res, { result });
// res.json({
//     status: "success",
//     code: 200,
//     data: {
//         result: products
//     }
// });
//};
// const controllerWrapper = (ctrl) => {
//   return async (req, res, next) => {
//     try {
//       await ctrl(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// };
// module.exports = getAll;
// module.exports = controllerWrapper;
