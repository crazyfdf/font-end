(modules => {
  // 14 定义webpackJsonpCallback 实现:合并模块定义,改变promise状态执行后续行为
  function webpackJsonpCallback(data) {
    // 01 获取需要被动态加载的模块id
    let chunkIds = data[0];
    // 02 获取需要被动态加载的模块依赖关系对象
    let moreModules = data[1];
    let chunkId,
      resolves = [];
    // 03 循环判断chunkIds里对应的模块内容是否已经完成了加载
    for (let i = 0; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (
        Object.prototype.hasOwnProperty.call(installedChunks, chunkId) &&
        installedChunks[chunkId]
      ) {
        resolves.push(inStalledChunks[chunkId][0]);
      }
      // 更新当前的chunk状态
      for (moduleId in moreModules) {
        if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
          modules[moduleId] = moreModules[moduleId];
        }
      }

      while (resolves.length) {
        resolves.shift()();
      }
    }
  }
  // 15 对应inStalledChunks 用于标识某个chunkId对应的chunk是否加载
  let inStalledChunks = {
    main: 0,
  };
  // 01 定义对象用于将来缓存被加载过的模块
  function __webpack_require__(moduleId) {
    // 1-1 判断缓存中是否存在被加载的模块内容，如果存在则返回
    if (__webpack_require__.c[moduleId]) {
      return __webpack_require__.c[moduleId].exports;
    }
    // 1-2 如果缓存中不存在则加入执行被导入的模块内容加载
    let module = (__webpack_require__.c[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });
    // 1-3 调用函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // 1-4 执行调用完成之后，修改改模块的l属性标识当前模块加载完成
    module.l = true;
    // 1-5 加载工作完成之后，要将拿回来的内容返回到调用的位置
    return module.exports;
  }
  //  02 定义c属性一个__webpack_require__方法来替换import require加载操作
  __webpack_require__.c = {};
  //  03 定义m属性用于保存modules
  __webpack_require__.m = modules;
  // 04 定义o方法用于判断对象的身上是否存在指定的属性
  __webpack_require__.o = (object, property) => {
    return Object.prototype.hasOwnProperty(object, property);
  };
  // 05 定义d方法用于在对象的身上添加指定的属性，同事给该属性提供一个getter
  __webpack_require__.d = (exports, name, getter) => {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };
  // 06 定义r方法用于标识当前模块是es6类型
  __webpack_require__.r = exports => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
  // 07 定义n方法，用于设置具体的getter
  __webpack_require__.n = module => {
    let getter = module && module.__esModule ? () => module["default"] : () => module;
    __webpack_require__.d(getter, "", getter);
    return getter;
  };
  // 08 定义p属性，用于保存资源访问路径
  __webpack_require__.p = "";
  // 10 定义t方法，用于加载指定value的模块内容，之后对内容进行处理再返回
  __webpack_require__.t = (value, mode) => {
    // 01 加载value对应的模块内容(value 一般是模块id)
    //加载之后的内容又重新赋值给value变量
    if (mode & 1) {
      value = __webpack_require__(value);
    }
    // 加载了可以直接返回使用的内容
    if (mode & 8) {
      return value;
    }
    if (mode & 4 && typeof value === "object" && value && value.__esModule) {
      return value;
    }
    // 如果8和4都没有成立则需要自定义ns来通过default属性返回内容
    let ns = Object.create(null);

    __webpack_require__.r(ns);

    Object.defineProperty(ns, "default", { enumerable: true, value: value });

    if (mode & 2 && typeof value !== "string") {
      for (var key in value) {
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
      }
    }
    return ns;
  };
  // 11 定义变量存放数组
  let jsonpArray = (window["webpackJsonp"] = window["webpackJsonp"] || []);

  // 12保存原生的push方法
  let oldJsonpFunction = jsonpArray.push.bind(jsonpArray);

  // 13 重写原生的push方法
  jsonpArray.push = webpackJsonpCallback;

  // 09 调用__webpack_require__方法执行模块导入与加载操作
  return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})({
  "./src/index.js": (module, __webpack_exports__, __webpack_require__) => {
    var name = __webpack_require__.t(/*! ./login */ "./src/login.js", 0b0111);
    console.log("index.js内容");
    console.log(name);
  },
  "./src/login.js": (module, __webpack_exports__) => {
    module.exports = "拉钩教育";
  },
});
