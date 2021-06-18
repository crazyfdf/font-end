const { jwtSecret } = require("../config/config.default");
const { User } = require("../model");
const { verify } = require("../util/jwt");

module.exports = async (req, res, next) => {
  // 从请求头获取token数据
  let token = req.headers["authentication"];
  token = token ? token.split("Bearer ")[1] : null;
  if (!token) {
    return res.status(401).end();
  }
  try {
    const decodedToken = await verify(token, jwtSecret);
    req.user = await User.findById(decodedToken.userId);
    next();
  } catch (err) {
    return res.status(401).end();
  }
  // 验证token是否有效
  // 无效=》401
  // 有效=》把用户信息读取踹挂载到req请求对象上往后执行
};
