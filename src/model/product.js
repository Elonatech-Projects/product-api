const mongoose = require('mongoose');
const { Schema } = mongoose;

const boxItemsSchema = new Schema({
  productImage: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true }
});

const ratingIconSchema = new Schema({
  stars: { type: String, required: true } 
});

const productInformationsSchema = new Schema({
  imageOne: { type: String, required: true },
  imageTwo: { type: String, required: true },
  imageThree: { type: String, required: true }
});

const additionalInfoSchema = new Schema({
  nameOne: { type: String, required: true },
  nameTwo: { type: String, required: true },
  brand: { type: String, required: true },
  total: { type: Number, required: true },
  inStock: { type: String, required: true },
  shipping: { type: String, required: true }
});

const productDetailsSchema = new Schema({
  inch: { type: String, required: true },
  desc: { type: String, required: true },
  descOne: { type: String, required: true },
  descTwo: { type: String, required: true },
  descThree: { type: String, required: true },
  descFour: { type: String, required: true },
  text: { type: String, required: true },
  textOne: { type: String, required: true },
  textTwo: { type: String, required: true },
  headTag: { type: String, required: true },
  statement: { type: String, required: true },
  statementOne: { type: String, required: true }
});

const productsSchema = new Schema({
  newProduct: boxItemsSchema,
  starImg: [ratingIconSchema]
});

const extraProductInfoSchema = new Schema({
  firstProduct: productsSchema,
  arrayImg: [productInformationsSchema],
  productData: [additionalInfoSchema],
  details: productDetailsSchema
});

const ElonatechProduct = mongoose.model('ElonatechProduct', extraProductInfoSchema);

module.exports = ElonatechProduct;
