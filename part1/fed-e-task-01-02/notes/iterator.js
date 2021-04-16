/*
 * @Version: 1.0.0
 * @Author: 祸灵
 * @LastEditors: 祸灵
 * @Date: 2021-04-16 21:07:52
 * @LastEditTime: 2021-04-16 21:18:25
 * @Description:
 */
const todos = {
  life: ["a", "b", "c"],
  learn: ["1", "2", "3"],
  work: [".", "/", ","],
  each: function (callback) {
    const all = [].concat(this.life, this.learn, this.work);
    for (const item of all) {
      callback(item);
    }
  },
  // 迭代器模式，可以不用关心对象内部的方法，直接调用forof
  // [Symbol.iterator]: function () {
  //   const all = [...this.life, ...this.learn, ...this.work];
  //   let index = 0;
  //   return {
  //     next: function () {
  //       return {
  //         value: all[index],
  //         done: index++ >= all.length,
  //       };
  //     },
  //   };
  // },
  // 使用生成器的迭代器模式
  [Symbol.iterator]: function* () {
    const all = [...this.life, ...this.learn, ...this.work];
    for (const item of all) {
      yield item;
    }
  },
};
todos.each(item => {
  console.log(item);
});
for (const item of todos) {
  console.log(item);
}
