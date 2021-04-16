/*
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-16 19:58:31
 * @LastEditTime: 2021-04-16 20:09:19
 * @Description:
 */
// Object.defineProperty 只能监听到对象的读写操作
// Proxy 能监听到对象的增删改查操作
const person = {
  name: "zce",
  age: 20,
};
const personProxy = new Proxy(person, {
  get(target, property) {
    console.log(target, property);
    return property in target ? target[property] : "default";
  },
  set(target, property, value) {
    console.log(target, property.value);
  },
  deleteProperty(target, property) {},
});
console.log(personProxy.money);

// Object.defineProperty 监听数字的操作需要重写数组的方法

const list = [];
const listProxy = new Proxy(list, {
  set(target, property, value) {
    console.log("set", property, value);
    target[property] = value;
    return true;
  },
});
listProxy.push(100);
