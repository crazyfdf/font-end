// 观察者
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    // data中的属性名称
    this.key = key;
    // 回调函数负责更新视图
    this.cb = cb;
    // 把watcher对象记录到Dep类的静态属性target
    Dep.target = this;
    // 触发get方法，在get方法中会调用addSub
    // 记录旧数据
    this.oldValue = vm[key];
    Dep.target = null;
  }
  update() {
    let newValue = this.vm[this.key];
    if (newValue === this.oldValue) return;
    this.cb(newValue);
    this.oldValue = newValue;
  }
}
