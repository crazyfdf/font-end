// Reflect提供了统一的一套用于操作对象的API
const obj = {
  name: "zce",
  age: 18,
};
console.log(Reflect.has(obj, "name"));
console.log(Reflect.deleteProperty(obj, "age"));
console.log(Reflect.ownKeys(obj));
