const express = require("express");
const router = express.Router();

const {
  addOrder,
  getMyOrders,
  markOrderPaid,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

// USER ROUTES
router.post("/", protect, addOrder);
router.get("/myorders", protect, getMyOrders);
router.put("/:id/pay", protect, markOrderPaid);

// ADMIN ROUTES
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status",protect,admin, updateOrderStatus);

router.put("/:id/cancel", protect, admin,cancelOrder);

module.exports = router;