/* eslint-disable spaced-comment */
/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const {
  register,
  logout,
  login,
  updateAvatar,
} = require("../../controllers/auth");

const { authMiddlewares } = require("../../middlewares/auth/authmiddlewares");
const upload = require("../../middlewares/upload");
const router = express.Router();
const { addUserValidation } = require("../../middlewares/validation/user");

router.post("/users/signup", addUserValidation, register);

router.post("/users/login", addUserValidation, login);

router.get("/users/logout", authMiddlewares, logout);

router.patch(
  "/users/avatars",
  upload.single("avatarURL"),
  authMiddlewares,
  updateAvatar
);

module.exports = router;
