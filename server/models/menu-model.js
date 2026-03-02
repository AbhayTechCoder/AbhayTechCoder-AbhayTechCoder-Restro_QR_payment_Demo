const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg'],
        required: true
    },
    image_url: {
        type: String
    },
    is_veg: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true // createdAt & updatedAt auto add karega
});

module.exports = mongoose.model('Menu', menuSchema);