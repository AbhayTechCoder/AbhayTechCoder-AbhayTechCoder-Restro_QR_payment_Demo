require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const { authRouter } = require("./routers/auth-router");
const { userRouter } = require("./routers/user-router");
const { dishRouter } = require("./routers/dish-router");
const { orderRouter } = require("./routers/order-routes");
const paymentRoutes = require("./routers/paymentRoutes");

const app = express();

/* ================= CORS CONFIG ================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://abhay-tech-coder-abhay-tech-coder-r.vercel.app",
  "https://abhay-tech-coder-abhay-tech-coder-r-virid.vercel.app",
  "https://abhay-tech-coder-abhay-tech-coder-restro-qr-payment-b392kqw25.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {

      // allow requests with no origin (mobile apps, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("CORS not allowed"));
    },
    credentials: true
  })
);

/* ================= MIDDLEWARE ================= */

app.use(express.json());
app.use(cookieParser());

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.send("Server running with MongoDB Abhay 🚀");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/dishes", dishRouter);
app.use("/api/payment", paymentRoutes);

/* ================= SOCKET SERVER ================= */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/* ================= DATABASE + SERVER START ================= */

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });