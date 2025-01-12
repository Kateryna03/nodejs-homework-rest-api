/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
//const updateContact = require("../../model/contacts/updateContact");
const { Contact } = require("../../db");
const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      res
        .status(404)
        .json({ message: `Contact with id=${contactId} not found` });
    }
    res.json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
