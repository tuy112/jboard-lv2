const http = require("http");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const express = require('express');
const router = express.Router();
let arr = [];

// server
http .createServer((request, response) => {
  if(request.url === "/") {
    response.writeHead(200);
    response.end("main url");
  } else if (request.url === "/upload") {
    response.writeHead(200);
    response.end("/upload url");
  } else if (request.url === "/delete") {
    response.writeHead(200);
    response.end("/delete url");
  } else {
    response.writeHead(404);
    response.end("Not Found!");
  }
}).listen(3000, () => {
  console.log("서버가 연결되었당께요~ :)")
})

// ======================구분선=============================

// routing
app.use('/', indexRouter);
app.use('/routes/users', usersRouter);

// ======================구분선=============================

// CRUD start!!!
// get
router.get('read', (req,res) => {
  res.status(200).json({
    message: "read 성공"
  });
});

// post
router.post('/create', (req,res) => {
  const { data } = req.body;
  arr.push(data);
  res.status(200).json({
    message: "create 성공",
    result: arr
  });
});

// PUT
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  arr[id] = data;
  res.status(200).json({
    message: "update 성공",
    result: arr
  });
});

// DELETE
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  arr.splice(id, 1);
  res.status(200).json({
    message: "delete 성공",
    result: arr
  });
});

module.exports = router;

// ======================구분선=============================

// middleware
app.use((req, res, next) => {
  console.log("middleware");
  next();
});

// ======================구분선=============================

