/*
  将下面异步代码使用 Promise 的方法改进
  尽量用看上去像同步代码的方式
  setTimeout(function () {
    var a = 'hello'
    setTimeout(function () {
      var b = 'lagou'
      setTimeout(function () {
        var c = 'I ♥ U'
        console.log(a + b +c)
      }, 10)
    }, 10)
  }, 10)
*/
/**
 * @description: 封装一个promise
 * @param {array} fn 回调函数
 * @return {*}
 */

//方法一.直接用promise
new Promise((resolve, reject) => {
  setTimeout(function () {
    var a = "hello";
    resolve(a);
  }, 10);
})
  .then(value => {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        var b = "lagou";
        resolve(value + b);
      }, 10);
    });
  })
  .then(value => {
    setTimeout(function () {
      var c = "I ♥ U";
      console.log(value + c);
    }, 10);
  })
  .catch(reason => {
    console.log(reason);
  });

// 方法二.封装promise
function setTimeoutPromise(value, time = 10) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });
}
setTimeoutPromise("hello", 10)
  .then(value => {
    var b = value + "lagou";
    return setTimeoutPromise(b, 10);
  })
  .then(value => {
    var c = value + "I ♥ U";
    return setTimeoutPromise(c, 10);
  })
  .then(value => {
    console.log(value);
  })
  .catch(reason => {
    console.log(reason);
  });
