/*
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-16 20:41:45
 * @LastEditTime: 2021-04-16 20:51:13
 * @Description:
 */
console.log(Symbol() === Symbol()); //false
console.log(Symbol("foo") === Symbol("foo")); //false
// Symbol.for方法维护了一个全局的注册表，为字符串和symbol提供了一一对应的关系。for的参数会被转换成字符串
console.log(Symbol.for("foo") === Symbol.for("foo"));
console.log(Symbol.for(true) === Symbol.for("true"));
const obj = {
  [Symbol.toStringTag]: "aObj",
  [Symbol()]: "symbol value",
  foo: "normal value",
};
console.log(obj.toString()); //aObj
console.log(Object.keys(obj)); //[ 'foo' ]
console.log(Object.getOwnPropertyNames(obj)); //[ 'foo' ]
console.log(Object.getOwnPropertySymbols(obj)); //[ Symbol(Symbol.toStringTag), Symbol() ]
console.log(Reflect.ownKeys(obj)); //[ 'foo', Symbol(Symbol.toStringTag), Symbol() ]
