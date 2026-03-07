const express = require("express");

const {
  getAdmin,
  getMessages,
  editMessage,
  deleteMessage,
  getAllUser,
  getMe,
  postMessage,
  getAllMessagesForAdmin
} = require("../controllers/user-controller");

const { isAuth } = require("../middlewares/isAuth");
const { isAdmin } = require("../middlewares/isAdmin");

const userRouter = express.Router();

userRouter.get("/getusers", isAuth, isAdmin, getAllUser);

userRouter.get("/me", isAuth, getMe);

userRouter.get("/getAdmin", isAuth, getAdmin);

/* 🔥 OWNER CHAT API */
userRouter.get("/admin/messages", isAuth, getAllMessagesForAdmin);

userRouter.get("/message", isAuth, getMessages);

userRouter.post("/message", isAuth, postMessage);

userRouter.put("/message/:messageId", isAuth, editMessage);

userRouter.delete("/message/:messageId", isAuth, deleteMessage);

module.exports = { userRouter };