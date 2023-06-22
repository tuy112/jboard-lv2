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

// userID는 mongoDB에 저장되는 _id 값
usersSchema.virtual("usersId").get(function(){  
  return this._id.toHexString();
});

// userID를 JSON 형식으로 바꾸려고 할때 사용
usersSchema.set("toJSON",{
  virtuals: true, // JSON 형태로 가공할 때, userID를 출력 시켜준다.
})

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;