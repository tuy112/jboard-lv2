const express = require('express');
const router = express.Router();

const Users = require("../schemas/users");

// POST /api/users
router.post("/users", async (req, res) => {
  const { usersId, name, email } = req.body;

  try {
    const existingUser = await Users.findOne({ usersId });
    if (existingUser) {
      return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
    }

    const createdUser = await Users.create({ usersId, name, email });

    res.json({ users: createdUser });
  } catch (error) {
    console.error("회원 생성 에러:", error);
    res.status(500).json({ success: false, errorMessage: "서버 에러" });
  }
});

// GET /api/users
router.get("/", (req, res) => {
  res.send("users.js 기본 경로 GET 메서드");
});

// GET /api/users/about
router.get("/about", (req, res) => {
  res.send("users.js about 경로");
});

module.exports = router;