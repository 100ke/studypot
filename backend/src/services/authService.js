const models = require("../models");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utils/token");

// db 및 유틸리티 함수 호출
// db 조회, 비밀번호 해싱/비교, 토큰 발급, 에러 핸들링

const signup = async (email, name, password) => {
  try {
    const hashedPw = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      email: email,
      name: name,
      password: hashedPw,
    });
    return { message: "회원가입 성공", user: { id: user.id, email } };
  } catch (error) {
    if (
      error.name === "SequelizeUniqueConstraintError" ||
      (error.errors && error.errors[0].type === "unique violation")
    ) {
      const err = new Error("이미 존재하는 이메일입니다.");
      err.status = 409;
      throw err;
    }
    error.status = 500;
    throw error;
  }
};

const login = async (email, password) => {
  const user = await models.User.findOne({
    where: { email: email },
  });
  if (!user) {
    const error = new Error("등록된 사용자가 없습니다.");
    error.status = 401;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    error.status = 401;
    throw error;
  }
  const accessToken = generateAccessToken(user);
  return { accessToken: accessToken, user };
};

module.exports = {
  signup,
  login,
};
