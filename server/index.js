require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const { authRouter } = require("./routers/auth-router");
const { userRouter } = require("./routers/user-router");
const { dishRouter } = require("./routers/dish-router");
const { orderRouter } = require("./routers/order-routes");
// const paymentRoutes = require("./routes/paymentRoutes");
const paymentRoutes = require("./routers/paymentRoutes");


const app = express();

/* ================= CORS CONFIG ================= */


/*
  CLIENT_URL must be set in Render Environment Variables
  Example:
  CLIENT_URL=https://abhay-tech-coder-abhay-tech-coder-r-virid.vercel.app
*/

/* ================= CORS CONFIG ================= */

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
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

/* ================= SERVER START ================= */

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });