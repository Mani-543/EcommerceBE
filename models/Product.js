const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },

    image: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    countInStock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add compound index for common queries
productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model(
  "Product",
  productSchema
);