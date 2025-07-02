const authService = require("../services/authService");

const signup = async (req, res) => {
  const { email, name, password } = req.body;
  const result = await authService.signup(email, name, password);
  res.status(201).json(result);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  //   res.status(200).json(result); // 토큰과 유저 정보가 모두 조회됨
  res
    .status(200)
    .json({ token: result.accessToken, userName: result.user.name });
};

module.exports = {
  signup,
  login,
};
