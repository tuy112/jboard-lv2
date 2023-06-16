const express = require('express');
const app = express();
const port = 3000;
const goodsRouter = require("./routes/goods");
const jstol = require('jstol')

app.set('view engine', 'html')
jstol.configure('views',{
    express:app,
})

// mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/jstol_db')
  .then(() => console.log('Connected!'));

// localhost:3000/api -> goodsRouter
app.use('/api', [goodsRouter]);


app.get('/',(req,res) => {
    res.render('index.html');
});

app.get('/boardWrite', (req,res)=>{
  res.render('boardWrite.html')
})

app.use(express.urlencoded({extended:true,}))

app.post('/write',(req,res)=>{
  let board = {...req.body}
  console.log(list, board)
  list.push(board)
  console.log(list)
  res.redirect('/board')
})

app.get('/view', (req,res)=>{
  console.log(list)
  res.render('view.html')
})

app.listen(port, () => {
    console.log(port, '서버가 열렸당께요!');
});