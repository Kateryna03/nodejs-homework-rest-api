/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable semi */

//const bcrypt = require("bcryptjs");
//const { Conflict } = require("http-errors");

const { User } = require("../../db");

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
    const newUser = new User({ email });
    //вызываю метод Юзера ктр добавляет объекту пароль захешированный
    newUser.setPassword(password);
    //сохраняю объект
    await newUser.save();
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
