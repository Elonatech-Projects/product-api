
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
// const MONGO_URL = process.env.MONGODB_URL;

const products = require('./src/router/products');
const cart = require('./src/router/cart');
const add = require('./src/router/postProduct');

app.get('/', ((req, res) => (
  res.send('Server is running 🚀')
)))

app.use(cors());
app.use(express.json());

app.use('/api/v1', products);
app.use('/api/v1', cart);
app.use('/api/v2', add);

async function start() {
  try {
    app.listen(PORT, ()=>{
      const mongo = mongoose.connect(process.env.MONGODB_URL);
      if (mongo) {
        console.log('server is connencted to mongo DB');
      }else{
        console.log('server failed to connect to mongo DB');
      }
    })
  } catch (error) {
    console.log(`error-connecting: ${error}`);
  }
}

start();