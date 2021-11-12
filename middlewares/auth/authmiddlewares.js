/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable semi */
const jwt = require("jsonwebtoken");
const { User } = require("../../db");

const authMiddlewares = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      res.status(401).json({ message: "Not authorized" });
    }
    // if (!token) {
    //   res.status(401).json({ message: "Not authorized" });
    // }

    try {
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(id);
      if (!user) {
        res.status(401).json({ message: "User not found" });
      }
      if (!user.token) {
        res.status(401).json({ message: "User not found" });
      }
      // const user = jwt.decode(token, process.env.SECRET_KEY);
      // req.token = token;
      req.user = user;
      next();
    } catch (err) {
      next(err.message);
    }
  } catch (err) {
    next(err.message);
  }
  // next();
};

module.exports = {
  authMiddlewares,
};
