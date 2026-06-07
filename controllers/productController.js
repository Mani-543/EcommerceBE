const Product = require("../models/Product");

// Get All Products
const getProducts =
  async (req, res) => {

    const filter = {};

    if (req.query.keyword) {
      filter.name = {
        $regex: req.query.keyword,
        $options: "i",
      };
    }

    if (req.query.category) {
      filter.category =
        req.query.category;
    }

    const pageSize = 8;

    const page =
      Number(
        req.query.pageNumber
      ) || 1;

    const count =
      await Product.countDocuments(
        filter
      );

    const products =
      await Product.find(filter)
        .limit(pageSize)
        .skip(
          pageSize *
          (page - 1)
        );

    res.json({
      products,
      page,
      pages:
        Math.ceil(
          count /
          pageSize
        )
    });
  };

// Get Single Product
const getProductById = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Product
const createProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { returnDocument: "after" }
      );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    await product.deleteOne();

    res.json({
      message:
        "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllProductsAdmin = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAdmin,
 
};