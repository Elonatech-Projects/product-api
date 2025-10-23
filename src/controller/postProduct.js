const Product = require('../model/postProduct');
const cloudinary = require("../libs/cloudinary");

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      odd,
      brand,
      quantity,
      category,
      computerProperty // this will come as JSON string
    } = req.body;

    if (!name || !brand || !price || !odd || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill Name, Brand, Price, and Category fields.",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Please add product images." });
    }

    // Upload each image to Cloudinary
    const imagesBuffer = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path,
        { folder: "products" });
      imagesBuffer.push({
        public_id: result.public_id, url: result.secure_url
      });
    }

    const parsedComputerProperty = computerProperty ? JSON.parse(computerProperty) : {};
    console.log('parsed', parsedComputerProperty);

    const data = {
      name,
      description,
      price,
      odd,
      brand,
      quantity,
      id: parseInt(Date.now() * Math.random()),
      category,
      computerProperty: [parsedComputerProperty],
      images: imagesBuffer,
    };

    const product = await Product.create(data);
    console.log('product', product);

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    next(error);
  }
};

module.exports = {
  createProduct
}
