/* eslint-disable semi */
/* eslint-disable quotes */
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../model");

const { addPostValidation } = require("../middlewares/validationJoi");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({ contacts, status: "success" });
  } catch (error) {
    next(error.message);
  }
};

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

const addToContacts = async (req, res, next) => {
  try {
    if (addPostValidation) {
      const newContact = await addContact(req.body);
      res.status(201).json({ newContact, status: "success" });
    }
  } catch (error) {
    next(error.message);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const removedContact = await removeContact(req.params.contactId);
    // if (!removedContact) {
    //   res.status(404).json({ message: "No such contact in this list" });
    // }
    res.status(200).json({ message: "successfully removed" });
  } catch (error) {
    next(error.message);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      res.status(404).json({ message: "No such contact" });
    }
    res
      .status(200)
      .json({ updatedContact, message: "Contact successfully update" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  updateContactById,
  deleteContact,
  addToContacts,
};
