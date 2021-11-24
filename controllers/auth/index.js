/* eslint-disable semi */
/* eslint-disable quotes */
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const verifyCntr = require("./verify");
const verifyResending = require("./verifyResending");
module.exports = {
  register,
  login,
  logout,
  updateAvatar,
  verifyCntr,
  verifyResending,
};
