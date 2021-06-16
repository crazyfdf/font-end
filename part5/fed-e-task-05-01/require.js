const fs = require("fs");
const path = require("path");
const vm = require("vm");

function Module(id) {
  this.id = id;
  this.exports = {};
}
Module._resolveFilename = function (filename) {
  // 利用Path将filename转为绝对路径
  let absPath = path.resolve(__dirname, filename);
  // 判断当前路径对应的内容是否存在()
  if (fs.existsSync(absPath)) {
    // 如果条件成立说明absPath对应的内容是存在的
    return absPath;
  } else {
    // 文件定位
    let suffix = Object.keys(Module._extensions);
    for (let i = 0; i < suffix.length; i++) {
      let newPath = absPath + suffix[i];
      if (fs.existsSync(newPath)) {
        return newPath;
      }
    }
    throw new Error(`${filename} is not exists`);
  }
};

Module._extensions = {
  ".js"() {},
  ".json"() {},
};

Module._cache = {};

function myRequire(filename) {
  // 1.获取绝对路径
  let absPath = Module._resolveFilename(filename);

  // 2.缓存优先
  let cacheModule = Module._cache[absPath];
  if (cacheModule) return cacheModule.exports;

  // 3.创建空对象加载目标模块
  let module = new Module(absPath);

  // 4.缓存已加载过的模块
  Module._cache[absPath] = module;

  // 5.执行加载(编译执行)
  module.load();

  // 6.返回数据
  return module.exports;
}

let obj = myRequire("./v");
console.log(obj);
