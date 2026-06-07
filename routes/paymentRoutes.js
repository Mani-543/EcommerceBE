const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

// ✅ CREATE ORDER ROUTE (MISSING BEFORE)
router.post("/create-order", protect, createOrder);

// ✅ VERIFY PAYMENT ROUTE
router.post("/verify", protect, verifyPayment);

module.exports = router;