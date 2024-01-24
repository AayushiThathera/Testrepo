const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
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

module.exports = UserSchema;
