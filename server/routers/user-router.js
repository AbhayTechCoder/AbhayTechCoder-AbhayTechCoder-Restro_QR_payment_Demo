const express = require("express");
const { isAuth } = require("../middlewares/isAuth");
const {
  postMessage,
  getAdmin,
  getMessages,
  editMessage,
  deleteMessage,
  getAllUser,
  getMe,
} = require("../controllers/user-controller");
const { isAdmin } = require("../middlewares/isAdmin");

const userRouter = express.Router();

userRouter.get("/getusers", isAuth, isAdmin, getAllUser);
userRouter.get("/me", isAuth, getMe);
userRouter.get("/getAdmin", isAuth, getAdmin);

userRouter.get("/message", isAuth, getMessages);

userRouter.post("/message", isAuth, postMessage);

userRouter.put("/message/:messageId", isAuth, editMessage);
userRouter.delete("/message/:messageId", isAuth, deleteMessage);

module.exports = { userRouter };