const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // filename: {
  //   type: String,
  //   required: true,
  // },
  // path: {
  //   type: String,
  // },
});

module.exports = UserSchema;
