const mongoose = require("mongoose");

const nonVegMenuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            default: "non-veg"
        },
        image_url: {
            type: String,
            default: ""
        },
        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const NonVeg = mongoose.model("NonVeg", nonVegMenuSchema);

module.exports = {NonVeg};
