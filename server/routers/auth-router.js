const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/auth-controllers");

const authRouter = express.Router();  // ✅ Router

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/logout").post(logoutUser);

module.exports = { authRouter };