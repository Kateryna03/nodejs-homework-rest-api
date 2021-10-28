/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
const getContactById = require("../../model/contacts/getContactById");

//const { addPostValidation } = require("../middlewares/validationJoi");

const getOneContact = async (req, res, next) => {
  try {
    const findedContact = await getContactById(req.params.contactId);
    findedContact
      ? res.status(200).json({ findedContact, status: "success" })
      : res.status(404).json({ message: "No such contact" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = getOneContact;
