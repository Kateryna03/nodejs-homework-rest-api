/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
//const removeContact = require("../../model/contacts/removeContact");
const { Contact } = require("../../db");
const deleteContact = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const removedContact = await Contact.findByIdAndRemove(
      req.params.contactId
    );
    if (!removedContact) {
      res.status(404).json({ message: "No such contact in this list" });
    }
    res.status(200).json({ message: "successfully removed" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = deleteContact;
