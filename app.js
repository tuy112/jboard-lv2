const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

const Users = require("./schemas/users");

// MongoDB 연결
const connect = require('./schemas/index');
connect();

// 미들웨어 설정
app.use(express.json());

// 라우터 설정
const usersRouter = require('./routes/users');
const cartsRouter = require('./routes/carts');
app.use('/api', [usersRouter, cartsRouter]);

app.use(cookieParser());
app.use(express.static("assets")); 

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send(`
    <h1>로그인</h1>
    <form action="/login" method="POST">
      <label for="username">사용자명:</label>
      <input type="text" id="username" name="username">
      <br>
      <label for="password">비밀번호:</label>
      <input type="password" id="password" name="password">
      <br>
      <button type="submit">로그인</button>
    </form>
    <form action="/signup" method="GET">
      <button type="submit">회원가입</button>
    </form>
  `);
});

app.get('/signup', (req, res) => {
  res.send(`
    <h1>회원가입</h1>
    <form action="/signup" method="POST">
      <label for="username">사용자명:</label>
      <input type="text" id="username" name="username">
      <br>
      <label for="password">비밀번호:</label>
      <input type="password" id="password" name="password">
      <br>
      <label for="email">이메일:</label>
      <input type="email" id="email" name="email">
      <br>
      <button type="submit">회원가입완료</button>
    </form>
  `);
});

// 로그인 버튼 클릭 시
app.post('/login', async (req, res) => {
  const { usersId, password } = req.body;

  try {
    // 입력한 사용자명과 비밀번호로 사용자 조회
    const user = await Users.findOne({ usersId: usersId, password: password });

    if (!user) {
      // 사용자가 없을 경우 처리
      return res.status(404).json({ success: false, errorMessage: '일치하는 사용자가 없습니다.' });
    }

    // 로그인 성공 처리
    console.log('로그인 성공:', user);
    res.redirect('/dashboard');
  } catch (err) {
    console.error('로그인 실패:', err);
    return res.status(500).json({ success: false, errorMessage: '로그인에 실패했습니다.' });
  }
});


// 회원가입 완료 버튼 클릭 시
debugger;
app.post('/signup', async (req, res) => {
  const { usersId, password, email } = req.body;

  // 회원가입 처리 로직 작성
  try {
    const user = new Users({ usersId: usersId, password: password, email: email });
    await user.save(); 

    console.log('회원가입 완료:', user);
    res.redirect('/login');
  } catch (err) {
    console.error('회원가입 실패:', err);
    return res.status(500).json({ success: false, errorMessage: '회원가입에 실패했습니다.' }); // 회원가입 실패 응답
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`${port} 포트가 열렸습니다^^`);
});
