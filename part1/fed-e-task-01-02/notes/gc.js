/**
 * GC是一种机制，垃圾回收器完成具体的工作
 * 工作的内容就是查找垃圾释放空间、回收空间
 * 算法就是工作时查找和回收所遵循的规则
 */
// GC里的垃圾是什么
// 1.程序中不再需要的对象
function func(params) {
  name = "lg";
  return `${name}`;
}
func();
/** */
// 程序中不能再访问到的对象
function func1() {
  const name = "lg";
  return `${name}`;
}
func1();

var a = 10;
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a);
    });
  },
};
obj.fn();
