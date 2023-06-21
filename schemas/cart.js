const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  usersId: {
    type: Number,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Cart", cartSchema);