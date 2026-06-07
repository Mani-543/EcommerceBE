const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinary");

router.post("/", async (req, res) => {
  try {
    const file = req.body.data;

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "ecommerce",
    });

    res.json({
      url: uploadResponse.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;