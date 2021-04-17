/*
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-16 19:07:48
 * @LastEditTime: 2021-04-16 19:34:39
 * @Description:
 */
// ES2015以前只有函数作用域和全局作用域，之后又新加了块级作用域。var没有块级作用域
if (true) {
  var foo = "zce";
}
console.log(foo); //zce
// var会声明到全局
for (var index = 0; index < 3; index++) {
  // 后面声明的index覆盖了全局的index
  for (var index = 0; index < 3; index++) {
    console.log(index); //0 1 2
  }
}

// index被var声明到全局在循环结束后变成了3
var elements = [{}, {}, {}];
for (var index = 0; index < elements.length; index++) {
  elements[index].onclick = function () {
    console.log(index);
  };
}

elements[0].onclick(); //3

// var 声明提升
console.log(foo1); //undefined
var foo1 = "zce";
