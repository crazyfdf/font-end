/*
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-16 21:23:00
 * @LastEditTime: 2021-04-16 21:34:39
 * @Description:
 */
const obj = {
  foo: "value1",
  bar: "value2",
};
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
console.log(new Map(Object.entries(obj)));

const p1 = {
  firstName: "lei",
  lastName: "Wang",
  get fullName() {
    return this.firstName + " " + this.lastName;
  },
};
// const p2 = Object.assign({}, p1);
// p2.firstName = "zce";
// console.log(p2.fullName);//lei Wang
const descriptors = Object.getOwnPropertyDescriptors(p1);
const p2 = Object.defineProperties({}, descriptors);
p2.firstName = "zce";
console.log(p2.fullName); //zce Wang

const books = {
  html: 5,
  css: 16,
  javascript: 128,
};
for (const [key, value] of Object.entries(books)) {
  console.log(`${key.padEnd(16, "0")}|${value.toString().padStart(3, "0")}`);
  /**html000000000000|005
  css0000000000000|016
  javascript000000|128*/
}
