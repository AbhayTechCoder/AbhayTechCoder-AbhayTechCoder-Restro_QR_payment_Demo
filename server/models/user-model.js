const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
  
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    resetOtp: String,
    expireOtpTime: Date,
    isOtpVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
/* ===============================
   🔐 1️⃣ HASH PASSWORD BEFORE SAVE
================================== */
userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

/* ===============================
   🔑 2️⃣ COMPARE PASSWORD METHOD
================================== */
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


/* ===============================
   🎟 3️⃣ GENERATE JWT TOKEN
================================== */
userSchema.methods.generateToken = function () {

    return jwt.sign(
        {
            id: this._id,
            role: this.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};


/* ===============================
   🛡 4️⃣ VERIFY TOKEN METHOD
   (Static Method – Better Practice)
================================== */
userSchema.statics.verifyToken = function (token) {
    try {
        const varifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        return varifiedToken;
    } catch (error) {
        return null;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = {User};