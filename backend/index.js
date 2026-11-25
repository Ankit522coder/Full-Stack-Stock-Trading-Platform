require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { authenticateUser } = require("./Middleware/AuthMiddleware");

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
  "https://zerodha-frontend-taupe.vercel.app",
  "https://zerodha-dashboard-xi.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
]
  .filter(Boolean)
  .flatMap((origins) => origins.split(","))
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests and tools without Origin header.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);

app.get("/allHoldings", authenticateUser, async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", authenticateUser, async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/orders", authenticateUser, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

app.post("/newOrder", authenticateUser, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const newOrder = new OrdersModel({
      userId: req.user._id,
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();
    return res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to place order" });
  }
});

app.delete("/orders/:id", authenticateUser, async (req, res) => {
  try {
    const deletedOrder = await OrdersModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete order" });
  }
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const startServer = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
