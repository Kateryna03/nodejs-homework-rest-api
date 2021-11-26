/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable spaced-comment */
//const jwt = require("jsonwebtoken");
//const { BadRequest, NotFound, Unauthorized } = require("http-errors");
// eslint-disable-next-line quotes
const { User } = require("../../db");
const sendMail = require("../../helpers/sendGrid/sendMail.js");
//const { SECRET_KEY } = process.env;

const verifyResending = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "missing required field email" });
    } else if (user.verify) {
      res.status(400).json({ message: "Verification has already been passed" });
    } else if (!user.verify) {
      const mail = {
        to: email,
        subject: "Подтверждение регистрации",
        html: `<a href="http://localhost:8086/api/auth/users/verify/${user.verificationToken}">Перейдите по ссылке для подтверждения</a>`,
      };

      await sendMail(mail);
      res.status(200).json({ message: "Verification email sent" });
    }
    // const payload = {
    //   id: user._id,
    // };

    // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    // await User.findByIdAndUpdate(user._id, { token });
    // res.json({
    //   status: "success",
    //   code: 200,
    //   // data: user,
    //   data: {
    //     token,
    //     email,
    //   },
    // });
  } catch (error) {
    next(error.message);
  }
};

module.exports = verifyResending;
