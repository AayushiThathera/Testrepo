const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    unique: false,
  },
  rating: {
    type: String,
    required: true,
    unique: true,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
  },
});

module.exports = ProductSchema;
