/*
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-16 20:53:00
 * @LastEditTime: 2021-04-16 21:01:11
 * @Description:
 */
const list = [1, 2, 4];
for (const value of list) {
  console.log(value);
}

const set = new Set([4444, 455]);
console.log(set);
for (const value of set) {
  console.log(value);
}

const map = new Map([
  ["sss", 4444],
  ["key", 455],
]);
map.set("foo", 123);
map.set("var", 333);
console.log(map);
for (const [key, value] of map) {
  console.log(key, value);
}
