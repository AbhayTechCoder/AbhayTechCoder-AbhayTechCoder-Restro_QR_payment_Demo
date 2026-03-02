const { User } = require("../models/user-model");


const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create user (password hashing auto by model)
        const user = await User.create({
            username,
            email,
            password,
            role: role || "customer"
        });

        // Generate JWT token (from model method)
        const token = user.generateToken();

        // Send response (never send password)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "lax", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // 6️⃣ Send response without token in body
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error during registration",
            error: error.message
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //  Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user (IMPORTANT: select password)
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Generate token
        const token = user.generateToken();

        // Send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send response without password
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // production me true
            sameSite: "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
};

module.exports = { registerUser, loginUser, logoutUser };