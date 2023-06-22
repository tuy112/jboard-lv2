const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/jstol_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    })
    .then(() => {
      console.log('MongoDB가 연결 성공!');
    })
    .catch(err => {
      console.log('MongoDB 연결 에러', err);
    });
};

module.exports = connect;