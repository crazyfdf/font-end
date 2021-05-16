## 简答题

（请直接在本文件中作答）

#### 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

1. 响应式系统升级
  - vue2中响应式的原理defineProperty，在初始化的时候会遍历data中的所有成员，把对象的属性转化为getter、setter，如果data中的属性是对象的话，需要继续递归对象的所有属性。
  - vue3中使用的是proxy对象，性能比defineProperty好，而且可以监听对象属性的访问，赋值，删除等操作，不需要初始化时遍历每一个属性，如果有多层属性嵌套的话，只有访问某个属性的时候，才会递归处理下一级属性，使用proxy对象默认就可以监听到动态添加的属性，而vue2需要vue.set处理。
2. 编译优化
  - vue2通过标记静态根节点，diff的时候会跳过静态根节点来优化diff，但是静态节点还需要diff
  - vue3中通过标记和提升所有的静态根节点，diff的时候会跳过静态根节点，只需要对比动态节点内容；对事件处理函数进行缓存，减少了不必要的更新操作组件不再需要根节点。
3. 源码体积的优化
　- vue3移除了一些不常用的API，例如：inline-template、filter等
  - Tree-shaking支持更好，tree-shaking依赖ES module，通过import export,通过编译阶段的静态分析，找到没有引入的模块，在打包的时候过滤掉。打包体积会更小。
　

　

#### 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

　

　

　

#### 3、Proxy 相对于 Object.defineProperty 有哪些优点？

　

　

　

#### 4、Vue 3.0 在编译方面有哪些优化？

　

　

　

#### 5、Vue.js 3.0 响应式系统的实现原理？

　

　

　