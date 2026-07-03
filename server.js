const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();
const paymentRoutes = require("./routes/paymentRoutes");



connectDB();

const app = express();

// Enable compression middleware
app.use(compression());

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://ecommerceapo.netlify.app",
      "https://www.ecommerceapo.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Cache control for API responses (short cache for product data)
app.use((req, res, next) => {
  if (req.method === 'GET' && req.url.includes('/products')) {
    res.set('Cache-Control', 'public, max-age=300'); // 5 minutes cache
  }
  next();
});

// Routes
app.use("/api/users", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/payment", paymentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});