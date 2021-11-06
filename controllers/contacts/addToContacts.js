/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
// const addContact = require("../../model/contacts/addContact");
const { Contact } = require("../../db");
const addToContacts = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({ newContact, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = addToContacts;
