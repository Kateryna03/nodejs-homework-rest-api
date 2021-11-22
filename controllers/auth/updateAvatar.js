/* eslint-disable no-undef */
/* eslint-disable padded-blocks */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
//const { BadRequest, NotFound, Unauthorized } = require("http-errors");
const { User } = require("../../db");
//const { SECRET_KEY } = process.env;

const avatarDir = path.join(__dirname, "../../public/avatars");
console.log(avatarDir);

const updateAvatar = async (req, res, next) => {
  try {
    console.log("HELLO");
    const { email, _id, token } = req.user;
    //console.log("ID", _id);
    const user = await User.findOne(_id);
    //console.log(user);
    //способ №2
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
    }

    // const payload = {
    //   id: user._id,
    // };
    //const { id } = req.params;
    const { path: tempUpload, originalname } = req.file;
    // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    const resultUpload = path.join(avatarDir, _id, `${_id}_${originalname}`);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join(
      "/public/avatars",
      _id,
      `${_id}_${originalname}`
    );
    await User.findByIdAndUpdate(_id, { avatarURL: url }, { new: true });
    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload); //удаляет неудачное сохранение
    next(error.message);
  }
};

module.exports = updateAvatar;
