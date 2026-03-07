const { Message } = require("../models/message-model");
const { User } = require("../models/user-model");

const getAllUser = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "Users not found"
            });
        }

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};
const getMe = async (req, res) => {
    try {
        const user = req.user;   // already available from middleware

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// GET /api/user/admin
const getAdmin = async (req, res) => {
    try {
        const admin = await User.findOne({ role: "admin" }).select("_id username");

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({
            success: true,
            admin
        });
    } catch (error) {
        res.status(500).json({ message: "get admin Server error", error: error.message });
    }
};


const postMessage = async (req, res) => {
    try {
    const senderId = req.user._id;
    const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Message text required",
            });
        }

        const admin = await User.findOne({ role: "admin" });
        
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        const newMessage = await Message.create({
            sender: senderId,
            receiver: admin._id,
            text,
        });

        res.status(201).json({
            success: true,
            data: newMessage,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const userId = req.user._id;

        const messages = await Message.find({
            $or: [
                { sender: userId },
                { receiver: userId },
            ],
        })
            .sort({ createdAt: 1 })
            .populate("sender", "username role")
            .populate("receiver", "username role");

        res.status(200).json({
            success: true,
            messages,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const editMessage = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { messageId } = req.params;
        const { text } = req.body;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found",
            });
        }

        // Only sender can edit
        if (message.sender.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        message.text = text;
        message.edited = true;
        await message.save();

        res.status(200).json({
            success: true,
            data: message,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { messageId } = req.params;

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found",
            });
        }

        if (message.sender.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        await message.deleteOne();

        res.status(200).json({
            success: true,
            message: "Message deleted",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


const getAllMessagesForAdmin = async (req, res) => {
  try {

    const admin = req.user;

    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    const messages = await Message.find()
      .sort({ createdAt: 1 })
      .populate("sender", "username role")
      .populate("receiver", "username role");

    res.status(200).json({
      success: true,
      messages
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};

module.exports = {
  getAllUser,
  getMe,
  getAdmin,
  postMessage,
  getMessages,
  editMessage,
  deleteMessage,
  getAllMessagesForAdmin
};