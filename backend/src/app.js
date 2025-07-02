require("dotenv").config();
const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const models = require("./models");
const authRouter = require("./routes/auth");

const app = express();

// 미들웨어 설정
app.use(express.json()); // json 파싱 미들웨어

// Swagger 설정
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 서버 구동 테스트
app.get("/", (req, res) => {
  res.send("hello studypot api");
});

// router
app.use("/auth", authRouter);

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
    .catch((err) => {
      console.log(`db error!: ${err}`);
      process.exit();
    });
});
