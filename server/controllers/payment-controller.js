const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/order-model");

/* ================= CREATE ORDER ================= */

const createOrder = async (req, res) => {
  try {

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required"
      });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    console.log("REQ BODY:", req.body);
    console.log("OPTIONS:", options);

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order
    });

  } catch (error) {

    console.error("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/* ================= VERIFY PAYMENT ================= */

const verifyPayment = async (req, res) => {

  try {

    const {

      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      tableNumber,
      totalAmount

    } = req.body;


    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");


    if (expectedSignature !== razorpay_signature) {

      return res.status(400).json({

        success: false,
        message: "Invalid signature"

      });

    }


    /* ================= SAVE ORDER ================= */

    const newOrder = await Order.create({

      tableNumber: tableNumber,
      items: cartItems,
      totalAmount: totalAmount,

      paymentId: razorpay_payment_id,
      paymentStatus: "paid",
      paymentMethod: "UPI",

      status: "pending"

    });

    /* ================= SOCKET EMIT ================= */

    const io = req.app.get("io");

    if (io) {

      io.emit("new-order", newOrder);

    }


    res.status(200).json({

      success: true,
      message: "Payment verified & order saved",
      order: newOrder

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,
      message: "Payment verification failed"

    });

  }

};



module.exports = {

  createOrder,
  verifyPayment

};