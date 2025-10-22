const express = require('express');
const link = express.Router();

const {
  createCart
} = require('../controller/cart');

link.post('/createCart', createCart);

module.exports = link;