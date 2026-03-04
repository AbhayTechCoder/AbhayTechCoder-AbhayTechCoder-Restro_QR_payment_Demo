const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  tableNumber: {
    type: Number,
    required: true
  },

  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);