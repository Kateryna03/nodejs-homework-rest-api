/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
const addContact = require("../../model/contacts/addContact");

const addToContacts = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json({ newContact, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = addToContacts;
