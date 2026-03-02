require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const { authRouter } = require("./routers/auth-router");
const { userRouter } = require("./routers/user-router");
const { dishRouter } = require("./routers/dish-router");
const { orderRouter } = require("./routers/order-routes");

const app = express();

/* ================= TEMPORARY DEBUG CORS ================= */
/* ⚠️ This allows ALL origins (for debugging only) */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* ================= MIDDLEWARE ================= */

app.use(cookieParser());
app.use(express.json());

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.send("Server running with MongoDB Abhay");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/dishes", dishRouter);

/* ================= SERVER START ================= */

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});