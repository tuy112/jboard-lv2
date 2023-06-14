const express = require('express');
const app = express();
const port = 3000;
const goodsRouter = require("./routes/goods");

// mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/jstol_db')
  .then(() => console.log('Connected!'));

// localhost:3000/api -> goodsRouter
app.use('/api', [goodsRouter]);


app.get('/',(req,res) => {
    res.send('hello World');
});

app.listen(port, () => {
    console.log(port, '서버가 열렸당께요!');
});