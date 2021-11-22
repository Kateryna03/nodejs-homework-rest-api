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
const Jimp = require("jimp");
//const { BadRequest, NotFound, Unauthorized } = require("http-errors");
const { User } = require("../../db");
//const { SECRET_KEY } = process.env;

const avatarDir = path.join(__dirname, "../../public/avatars");
console.log("ПУТЬ К ПАПКЕ АВАТАРОК", avatarDir);

//avatarURL.resize(250, 250, Jimp.RESIZE_BEZIER);
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
    const resultUpload = path.join(avatarDir, id, `${id}${originalname}`);
    //const resultUpload = path.join(avatarDir, originalname);
    console.log(resultUpload);
    //const imgPath = req.file.path;
    //const image = `${id}${originalname}`;
    Jimp.read(resultUpload, (err, image) => {
      if (err) throw err;
      image
        .resize(250, 250) // resize
        //   .quality(60) // set JPEG quality
        //   .greyscale() // set greyscale
        .write(`${id}${originalname}`); // save
    });
    await fs.rename(tempUpload, resultUpload);
    //const avatarURL = path.join("/public/avatars", id, originalname);
    const avatarURL = path.join("/public/avatars", id, `${id}${originalname}`);
    console.log(avatarURL);
    const result = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      { new: true }
    );
    if (!result) {
      res.status(401).json({ message: "No AVATARS" });
      //console.log("NO AVATARS");
    }
    console.log("RESULT", result);
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
