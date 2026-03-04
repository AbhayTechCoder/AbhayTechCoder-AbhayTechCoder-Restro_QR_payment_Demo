const Order = require("../models/order-model");

/* ================= CREATE ORDER ================= */

exports.createOrder = async (req, res) => {
  try {

    const order = await Order.create({
      tableNumber: req.body.tableNumber,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: "pending"
    });

    const io = req.app.get("io");

    /* realtime new order */

    io.emit("new-order", order);

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* ================= GET ALL ORDERS ================= */

exports.getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* ================= GET PENDING ORDERS ================= */

exports.getPendingOrders = async (req, res) => {
  try {

    const orders = await Order.find({ status: "pending" })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* ================= GET COMPLETED ORDERS ================= */

exports.getCompletedOrders = async (req, res) => {
  try {

    const orders = await Order.find({ status: "completed" })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
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

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};