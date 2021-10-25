/* eslint-disable spaced-comment */
/* eslint-disable semi */
/* eslint-disable quotes */

const express = require("express");
const router = express.Router();
const { getAllContacts } = require("../../controllers/contacts/getAllContacts");
const { getOneContact } = require("../../controllers/contacts/getOneContact");
const {
  updateContactById,
} = require("../../controllers/contacts/updateContactById");
const { deleteContact } = require("../../controllers/contacts/deleteContact");
const { addToContacts } = require("../../controllers/contacts/addToContacts");
// const {
//   getAllContacts,
//   getOneContact,
//   addToContacts,
//   deleteContact,
//   updateContactById,
// } = require("../../controllers/contacts");

const { addPostValidation } = require("../../middlewares/validation/contacts");

router.get("/", getAllContacts);

router.get("/:contactId", getOneContact);

router.post("/", addPostValidation, addToContacts); //валидацию добавила и сюда и в аддКонтактс - где оставлять нужно?

router.delete("/:contactId", deleteContact);

router.patch("/:contactId", updateContactById);

module.exports = router;
