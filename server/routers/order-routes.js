const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders } = require("../controllers/order-controller");
const { isAuth } = require("../middlewares/isAuth");

router.post("/create", isAuth, createOrder);
router.get("/all", isAuth, getAllOrders);

module.exports = { orderRouter: router };