const models = require("../models");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utils/token");

// db 및 유틸리티 함수 호출
// db 조회, 비밀번호 해싱/비교, 토큰 발급, 에러 핸들링

const signup = async (email, name, password) => {
  const hashedPw = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    email: email,
    name: name,
    password: hashedPw,
  });
  return { massage: "회원가입 성공", user: { id: user.id, email } };
};

const login = async (email, password) => {
  const user = await models.User.findOne({
    where: { email: email },
  });
  if (!user) {
    return { message: "사용자 없음" };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { message: "invalid email and password" };
  }
  const accessToken = generateAccessToken(user);
  return { accessToken: accessToken, user };
};

module.exports = {
  signup,
  login,
};
