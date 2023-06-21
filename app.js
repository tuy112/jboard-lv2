const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트가 열렸습니다^^');
});

app.use(express.json());

// ======================구분선=============================
// router middleware
const usersRouter = require("./routes/users");
app.use("/api", [usersRouter]);

// mongoDB
const connect = require("./schemas");
connect();
