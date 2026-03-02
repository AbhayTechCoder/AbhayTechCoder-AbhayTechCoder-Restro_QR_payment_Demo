require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { authRouter } = require("./routers/auth-router");
const { userRouter } = require("./routers/user-router");
const { dishRouter } = require("./routers/dish-router");
const { orderRouter } = require("./routers/order-routes");

const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "https://abhay-tech-coder-abhay-tech-coder-restro-qr-payment-p221k2lar.vercel.app",
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running with MongoDB Abhay");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/dishes", dishRouter);

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});