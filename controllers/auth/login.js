/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable semi */

//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const { BadRequest, NotFound, Unauthorized } = require("http-errors");
const { User } = require("../../db");
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //console.log(user);
    //способ №2
    if (!user || !user.comparePassword(password)) {
      res.status(401).json({ message: "Email or password is wrong" });
      //   throw new BadRequest("Wrong email or password");
    }
    // способ №1
    // if (!user) {
    //   throw new NotFound(`User with email: ${email} not found`);
    // }

    // const compareResult = bcrypt.compareSync(password, user.password);
    // if (!compareResult) {
    //   throw new Unauthorized("Password or email is not correct");
    // }
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      // data: user,
      data: {
        token,
        email,
      },
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = login;

////////////
// const { BadRequest } = require("http-errors");
// const { User } = require("../../models");
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email }, "_id email password");
//   if (!user || !user.comparePassword(password)) {
//     throw new BadRequest("Invalid email or password");
//   }

//   const token = user.createToken();
//   await User.findByIdAndUpdate(user._id, { token });
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       token,
//     },
//   });
// };
// module.exports = login;
