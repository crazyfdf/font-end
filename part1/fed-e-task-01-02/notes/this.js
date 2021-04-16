/*
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-16 19:53:44
 * @LastEditTime: 2021-04-16 20:13:38
 * @Description:
 */
let c = "123";
const person = {
  name: "tom",
  hey: () => {
    console.log(this);
  },
  [c]: 456,
};
console.log(person.hey());
