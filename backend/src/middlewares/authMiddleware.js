// 인가 (요청 전에 토큰 검증)
// 헤더의 authorization 에서 토큰 추출
// 검증 성공 시 req.user에 정보 추가 / 실패 시 401 error 반환
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "no exists token" });
  }
  // 토큰 검증
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "not authorized. 유효하지 않은 토큰" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  authenticate,
};
