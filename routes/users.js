// routes/user.js

const express = require('express');
const router = express.Router;

const Users = require("../schemas/users");
router.post("/users", async (req, res) => {
	const { usersId, name, thumbnailUrl, category, price } = req.body;

  const users = await users.find({ usersId });
  if (users.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdUsers = await Users.create({ usersId, name, thumbnailUrl, category, price });

  res.json({ users: createdUsers });
});

// localhost:3000/api/ GET
router.get("/", (req, res) => {
  res.send("default url for users.js GET Method");
});

// localhost:3000/api/about GET
router.get("/about", (req, res) => {
  res.send("users.js about PATH");
});

module.exports = router;