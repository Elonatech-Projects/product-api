const express = require("express");
const router = express.Router();
const {
  createProduct
} = require('../controller/postProduct');
const upload = require('../libs/multer');

router.post("/post", upload.array('images'), createProduct);

module.exports = router;