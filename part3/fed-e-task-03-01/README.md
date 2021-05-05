## 一、简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```js
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```
答： 
- 当我们点击按钮的时候动态给 data 增加的成员并不是是响应式数据。
- 理由：vue所有的操作都是在new Vue时做的，在Vue的构造函数中会创建一个observer对象，observer对象会将data中的对象变为响应式数据，而动态给data增加成员只是给Vue实例上增加了一个普通的属性而已。
- 实现响应式：对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property。例如，对于：
  ```js
  Vue.set(vm.someObject, 'b', 2)
  ```
  您还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：
  ```js
  this.$set(this.someObject,'b',2)
  ```
- 原理：Vue.set内部调用了observer中的defineReactive把属性转换成了getter与setter。

　

　



### 2、请简述 Diff 算法的执行过程

　
- diff算法执行过程在于调用patch函数，
- patch(oldVnode, vnode) ，对比oldVnode和vnode，把两个vnode的差异更新到真实DOM，并返回vnode作为下一次的oldVnode。
  1. 通过isVnode判断oldVnode是否是vnode对象，如果不是则通过emptyNodeAt将oldVnode转换为vnode对象
  2. 通过smeVnode判断oldVnode和vnode是否是相同节点。
    - true，调用patchVnode(oldVnode,vnode,insertedVnodeQueue),找两个节点的差异，将差异更新到DOM。
    - false，createElm(vnode, insertedVnodeQueue)创建新vnode对应的DOM元素，并把新DOM元素插入DOM树上，并把老节点的DOM元素移除
- updateChildren(elm, oldCh, ch, insertedVnodeQueue), 如果 VNode 有子节点，并且与旧VNode子节点不相同则执行 updateChildren()，比较子节点的差异并更新到DOM
　

　



 

## 二、编程题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
源码地址：https://gitee.com/huolingmengling/font-end/tree/master/part3/fed-e-task-03-01/notes/vue-router/src/vuerouterhash/index.js

```
let _Vue = null;
export default class VueRouter {
  static install(Vue) {
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    _Vue = Vue;
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      },
    });
  }
  constructor(options) {
    this.options = options;
    this.routeMap = {};
    this.data = _Vue.observable({
      current: "/",
    });
  }
  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent();
  }
  createRouteMap() {
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component;
    });
  }
  initComponents(Vue) {
    Vue.component("router-link", {
      props: {
        to: String,
      },
      template: '<a href="to"><slot/></a>',
      methods: {
        clickHandler(e) {
          window.location.hash = this.to;
          this.$router.data.current = this.to;
          e.preventDefault();
        },
      },
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickHandler,
            },
          },
          [this.$slots.default]
        );
      },
    });
    const self = this;
    Vue.component("router-view", {
      render(h) {
        const component = self.routeMap[self.data.current];
        return h(component);
      },
    });
  }
  initEvent() {
    window.addEventListener("hashchange", () => {
      this.data.current = location.hash.substr(1);
    });
  }
}
```

　

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
源码地址：hhttps://gitee.com/huolingmengling/font-end/blob/master/part3/fed-e-task-03-01/notes/vue-router/src/vue/js/compiler.js
```
 // 处理v-html指令
  htmlUpdater(node, key, value) {
    node.innerHTML = value;
    new Watcher(this.vm, key, newValue => {
      node.innerHTML = newValue;
    });
  }

  // 处理v-on指令
  onUpdater(node, key, value, eventType) {
    node.addEventListener(eventType, value);
    new Watcher(this.vm, key, newValue => {
      node.removeEventListener(eventType, value);
      node.addEventListener(eventType, newValue);
    });
  }
```
 　

　

### 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：

<img src="images/Ciqc1F7zUZ-AWP5NAAN0Z_t_hDY449.png" alt="Ciqc1F7zUZ-AWP5NAAN0Z_t_hDY449" style="zoom:50%;" />
项目地址：https://gitee.com/huolingmengling/font-end/tree/master/part3/fed-e-task-03-01/notes/snabbdom-demo
