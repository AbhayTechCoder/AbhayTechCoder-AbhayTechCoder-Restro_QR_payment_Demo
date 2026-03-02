const mongoose = require("mongoose");

const vegMenuSchema = new mongoose.Schema(
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
            default: "veg"
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

const Veg = mongoose.model("Veg", vegMenuSchema);

module.exports = {Veg};