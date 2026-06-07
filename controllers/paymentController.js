const razorpay =
require("../config/razorpay");

const createOrder =
async (req, res) => {

  try {

    const options = {
      amount:
      req.body.amount * 100,

      currency: "INR",

      receipt:
      `receipt_${Date.now()}`
    };

    const order =
    await razorpay.orders.create(
      options
    );

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });

  }
};

const crypto = require("crypto");

const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const generated = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_SECRET
    )
    .update(
      razorpay_order_id +
      "|" +
      razorpay_payment_id
    )
    .digest("hex");

  if (
    generated === razorpay_signature
  ) {
    res.json({
      success: true,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};