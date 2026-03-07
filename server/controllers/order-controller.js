const Order = require("../models/order-model");

/* ================= CREATE ORDER ================= */

exports.createOrder = async (req, res) => {
  try {

    const order = await Order.create({
      email: req.user?.email || req.body.email, // user email
      tableNumber: req.body.tableNumber,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: "pending"
    });

    const io = req.app.get("io");

    /* realtime new order */

    io.emit("new-order", order);

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/* ================= GET ALL ORDERS ================= */

exports.getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/* ================= GET PENDING ORDERS ================= */

exports.getPendingOrders = async (req, res) => {
  try {

    const orders = await Order.find({ status: "pending" })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/* ================= GET COMPLETED ORDERS ================= */

exports.getCompletedOrders = async (req, res) => {
  try {

    const orders = await Order.find({ status: "completed" })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/* ================= MARK ORDER SERVED ================= */

exports.markOrderServed = async (req, res) => {
  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );

    const io = req.app.get("io");

    /* realtime update */

    io.emit("order-served", order);

    res.json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



/* ================= GET ORDER BY EMAIL (FOR OWNER CHAT) ================= */

exports.getOrderByEmail = async (req, res) => {
  try {

    const order = await Order.findOne({
      email: req.params.email
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};