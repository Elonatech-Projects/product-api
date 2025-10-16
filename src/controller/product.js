const Product = require('../model/product');

const createProduct = async (req, res) => {
  try {
    const { firstProduct, arrayImg, productData, details } = req.body;

    if (!firstProduct) return res.status(400).json({ message: 'Missing firstProduct data' });
    if (!arrayImg) return res.status(400).json({ message: 'Missing arrayImg data' });
    if (!productData) return res.status(400).json({ message: 'Missing productData data' });
    if (!details) return res.status(400).json({ message: 'Missing details data' });

    const newProduct = firstProduct.newProduct || {};
    if (!newProduct.productImage) return res.status(400).json({ message: 'Image field missing' });
    if (!newProduct.productName) return res.status(400).json({ message: 'Name field missing' });
    if (!newProduct.category) return res.status(400).json({ message: 'Category field missing' });
    if (!newProduct.price) return res.status(400).json({ message: 'Price field missing' });

    if (!firstProduct.starImg || firstProduct.starImg.length === 0) {
      return res.status(400).json({ message: 'Star image field missing' });
    }

    const imgGroup = arrayImg[0] || {};
    if (!imgGroup.imageOne) return res.status(400).json({ message: 'Image one field missing' });
    if (!imgGroup.imageTwo) return res.status(400).json({ message: 'Image two field missing' });
    if (!imgGroup.imageThree) return res.status(400).json({ message: 'Image three field missing' });

    const brandGroup = productData[0] || {};
    if (!brandGroup.nameOne) return res.status(400).json({ message: 'Name one field missing' });
    if (!brandGroup.nameTwo) return res.status(400).json({ message: 'Name two field missing' });
    if (!brandGroup.brand) return res.status(400).json({ message: 'Brand field missing' });
    if (!brandGroup.total) return res.status(400).json({ message: 'Total field missing' });
    if (!brandGroup.inStock) return res.status(400).json({ message: 'InStock field missing' });
    if (!brandGroup.shipping) return res.status(400).json({ message: 'Shipping field missing' });

    const newProductDoc = await Product.create({
      firstProduct,
      arrayImg,
      productData,
      details
    });

    res.status(201).json({
      message: '✅ Product created successfully',
      data: newProductDoc
    });

console.log('new product', newProduct);

  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    if (!allProducts) {
      return res.status(400).json({
        message: 'No document found'
      })
    }
     res.status(201).json({
      message: '✅ Product created successfully',
      data: allProducts
    });

  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({
      message: 'Server Error',
      error: error.message
    });
  }
}

module.exports = { 
  createProduct ,
  getProducts
};