/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
//const updateContact = require("../../model/contacts/updateContact");
const { Contact } = require("../../db");
const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    if (!result) {
      res.status(400).json({ message: "missing field favorite" });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
