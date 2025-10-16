
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3005;
const MONGO_URL = process.env.MONGODB_URL;

const products = require('./src/router/products');

app.get('/', ((req, res) => (
  res.send('Server is running 🚀')
)))

app.use(cors());
app.use(express.json());

app.use('/api/v1', products);

async function start() {
  try {
    if (!MONGO_URL) {
      console.error("❌ MONGODB_URL not found in .env file!");
      process.exit(1);
    }

    await mongoose.connect(MONGO_URL, {});
    console.log("✅ Connected to MongoDB successfully!");

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

start();