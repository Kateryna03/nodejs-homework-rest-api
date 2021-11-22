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
const { url } = require("inspector");
const path = require("path");
//const { BadRequest, NotFound, Unauthorized } = require("http-errors");
const { User } = require("../../db");
//const { SECRET_KEY } = process.env;

const avatarDir = path.join(__dirname, "../../public/avatars");
console.log(avatarDir);

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  try {
    console.log("HELLO");
    const { email, id, token } = req.user;
    console.log("ID", id);
    const user = await User.findById(id);
    //console.log(user);
    //способ №2
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
    }

    // const payload = {
    //   id: user._id,
    // };
    //const { id } = req.params;

    // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    const resultUpload = path.join(avatarDir, id, `${id}_${originalname}`);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("/public/avatars", id, `${id}_${originalname}`);
    const result = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      { new: true }
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload); //удаляет неудачное сохранение
    next(error.message);
  }
};

module.exports = updateAvatar;
