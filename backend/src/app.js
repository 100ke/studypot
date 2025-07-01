const express = require("express");
const models = require("./models");

const app = express();

// 미들웨어 설정
app.use(express.json()); // json 파싱 미들웨어

// 서버 구동 테스트
app.get("/", (req, res) => {
  res.send("hello studypot api");
});

// 다른 라우터 하단에 에러 페이지 처리 (404, 500 등)

// 서버 실행
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 서버 실행 중`);

  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log(`db connect`);
    })
    .catch(() => {
      console.log(`db error!`);
      process.exit();
    });
});
