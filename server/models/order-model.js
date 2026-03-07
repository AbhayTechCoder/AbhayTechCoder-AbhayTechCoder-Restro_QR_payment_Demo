const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  tableNumber: {
    type: Number,
    required: true
  },

  items: [
    {
      name: {
        type: String,
        required: true
      },

      price: {
        type: Number,
        required: true
      },

      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  /* ================= ORDER STATUS ================= */

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },

  /* ================= PAYMENT INFO ================= */

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },

  paymentMethod: {
    type: String,
    enum: ["UPI", "Card", "Cash"],
    default: "UPI"
  },

  paymentId: {
    type: String
  }

},
{
  timestamps: true
}
);

module.exports = mongoose.model("Order", orderSchema);