/* eslint-disable semi */
/* eslint-disable quotes */
const getAllContacts = require("./getAllContacts");
const getOneContact = require("./getOneContact");
const addToContacts = require("./addToContacts");
const updateContactById = require("./updateContactById");
const deleteContact = require("./deleteContact");

module.exports = {
  getAllContacts,
  getOneContact,
  updateContactById,
  deleteContact,
  addToContacts,
};
