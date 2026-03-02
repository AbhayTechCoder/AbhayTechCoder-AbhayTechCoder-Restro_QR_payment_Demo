const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tableNumber: Number,
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);