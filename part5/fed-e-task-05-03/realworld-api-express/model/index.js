const mongoose = require("mongoose");
const { dbUri } = require("../config/config.default");
// 连接MongDB数据库
mongoose.connect(dbUri);

const db = mongoose.connection;
// 当连接失败时
db.on("error", console.error.bind(console, "connection error:"));
// 当连接成功时
db.once("open", function () {
  // we're connected!
  console.log("连接成功");
});

// 组织导出模型类
module.exports = {
  User: mongoose.model("User", require("./user")),
  Article: mongoose.model("Article", require("./article")),
};
