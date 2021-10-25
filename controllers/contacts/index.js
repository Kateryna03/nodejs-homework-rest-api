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
// exports.index = function (req, res) {
//   res.send("NOT IMPLEMENTED: ");
// };
// module.exports = {
//   getAllContacts: function (req, res) {},
//   getOneContact: function (req, res) {},
//   updateContactById: function (req, res) {},
//   deleteContact: function (req, res) {},
//   addToContacts: function (req, res) {},
// };
