const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getPendingOrders,
  getCompletedOrders,
  markOrderServed,
  getOrderByEmail
} = require("../controllers/order-controller");

const { isAuth } = require("../middlewares/isAuth");


/* ================= CREATE ORDER ================= */

router.post("/create", isAuth, createOrder);


/* ================= ALL ORDERS ================= */

router.get("/all", isAuth, getAllOrders);


/* ================= PENDING ORDERS ================= */

router.get("/pending", isAuth, getPendingOrders);


/* ================= COMPLETED ORDERS ================= */

router.get("/completed", isAuth, getCompletedOrders);


/* ================= MARK ORDER SERVED ================= */

router.patch("/served/:id", isAuth, markOrderServed);


/* ================= GET ORDER BY EMAIL ================= */

router.get("/by-email/:email", isAuth, getOrderByEmail);


module.exports = { orderRouter: router };