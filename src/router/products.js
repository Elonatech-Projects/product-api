const express = require('express');
const route = express.Router();

const {
  createProduct,
  getProducts
} = require('../controller/product');

route.post('/createProduct', createProduct);
route.get('/getProducts', getProducts);

module.exports = route;