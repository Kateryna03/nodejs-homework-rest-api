/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable semi */

//const bcrypt = require("bcryptjs");
//const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../db");
const avatarDir = path.join(__dirname, "../../public/avatars");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // eslint-disable-next-line spaced-comment
    //проверяем нет ли такого юзера уже в базе
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(409)
        .json({ message: `User with email: ${email} already exist` });
      //throw new Conflict(`User with email: ${email} already exist`);
    }
    //Создаю нового юзера в базе + хэширую пароль - способ №1
    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // const newUser = await User.create({ email, password: hashPassword });

    //Хэширую пароль в модели и вызываю метод модели - создаю объект
    const avatarURL = gravatar.url(`${email}`);
    const newUser = new User({ email, avatarURL });
    //вызываю метод Юзера ктр добавляет объекту пароль захешированный
    newUser.setPassword(password);
    //сохраняю объект
    await newUser.save();
    const avatarFolder = path.join(avatarDir, String(newUser._id));
    //console.log(newUser.email);
    await fs.mkdir(avatarFolder);
    res.status(201).json({
      newUser,
      status: "success",
      code: 201,
      message: "Register success",
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = register;
