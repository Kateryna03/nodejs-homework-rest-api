/* eslint-disable spaced-comment */
/* eslint-disable semi */
/* eslint-disable quotes */

const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getOneContact,
  updateContactById,
  deleteContact,
  addToContacts,
} = require("../../controllers/contactsControllers");
const { addPostValidation } = require("../../middlewares/validationJoi");

router.get("/", getAllContacts);

router.get("/:contactId", getOneContact);

router.post("/", addPostValidation, addToContacts); //валидацию добавила и сюда и в аддКонтактс - где оставлять нужно?

router.delete("/:contactId", deleteContact);

router.patch("/:contactId", updateContactById);

module.exports = router;
