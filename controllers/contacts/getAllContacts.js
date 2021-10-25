/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
const listContacts = require("../../model/contacts/listContacts");

//const { addPostValidation } = require("../middlewares/validationJoi");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

exports.module = getAllContacts;
