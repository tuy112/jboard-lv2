const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  usersId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;