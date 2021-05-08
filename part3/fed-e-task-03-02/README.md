## Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化

### 简答题

#### 1、请简述 Vue 首次渲染的过程。
1. Vue初始化实例成员与静态成员，
2. 调用vue构造函数，在 vue 的构造函数中，调用 _init 方法
3. _init 方法是由 initMixin(vue) 挂载的
4. 在 _init 方法中会判断是否是Vue 实例，如果是 Vue 实例就不需要 observer；如果是组件就执行组件的初始化方法；如果不是则用mergeOptions来合并options选项；之后初始化一些生命周期、事件处理、render 函数等,之后判断是否 $options 中有 el，如果有调用 $mount 方法，传入 vm.$options.el。
5. $mount的核心作用是把模板编译成render函数。判断是否有render选项，如果没有，则会获取template选项，如果template也没有，会把el中的outerHTML作为模板，通过compileToFunctions()方法将模板编译为render函数，编译好以后，将render存入到options.render中。最后执行mount.call方法调用mountComponent方法。
6. mountComponent 方法是在 instanc/lifecycle.js 中定义的，定义了 updateComponent 方法，调用 vm._update(vm._render...)。并在new Watcher 时，将 updateComponent作为参数传入；
7. Watcher的构造函数中把传入的updateComponent存储到getter里面，如果非lazy，则调用get方法，get中调用getter中存储的updateComponent方法，然后就会执行render把模板转换为vnode，然后执行update，调用vm.__patch__方法，将虚拟dom转化为真实dom并挂载到页面上，将生成的真实dom记录到vm.$el()中
　

　

　

#### 2、请简述 Vue 响应式原理。
1. Vue 响应式原理其实是在vm._init()中完成的，调用顺序initState()–>initData()–>observe()。
- initState初始化vue实例的状态
- initData把data属性注入到vue实例上
- observe把data对象转换成响应式对象，observe()就是响应式的入口函数。

2. observe(value)：这个方法接收一个参数value，就是需要处理成响应式的对象；判断value是否为对象，如果不是直接返回；判断value对象是否有__ob__属性，如果有直接返回；如果没有，创建observer对象；返回observer对象；

3. Observer：给value对象定义不可枚举的__ob__属性，记录当前的observer对象；数组的响应式处理，覆盖原生的push/splice/unshift等方法，它们会改变原数组，当这些方法被调用时会发送通知；对象的响应式处理，调用walk方法，遍历对象的每个属性，调用defineReactive；

4. defineReactive：为每一个属性创建dep对象，如果当前属性的值是对象，调用observe；定义getter，收集依赖，返回属性的值；定义setter，保存新值，如果新值是对象，调用observe，发送通知，调用dep.notify();

5. 依赖收集：在Watcher对象的get方法中调用pushTarget记录Dep.target属性；访问data中的成员时收集依赖，defineReactive的getter中收集依赖；把属性对应的watcher对象添加到dep的subs数组中；给childOb收集依赖，目的是子对象发送变化时发送通知；

6. Watcher：dep.notify在调用watcher对象的update()方法时，调用queueWatcher()，判断watcher是否被处理，如果没有的话添加到queue队列中，并调用flushSchedulerQueue()刷新任务队列:flushSchedulerQueue触发beforeUpdate钩子，调用watcher.run(),run()–>get()–>getter()–>updateComponent后把数据更新到视图上，最后清空上一次的依赖，触发actived钩子，触发updated钩子。
　

　

　

#### 3、请简述虚拟 DOM 中 Key 的作用和好处。

设置key比不设置key操作DOM次数少。

1. 不加key，在比对的时候每个相同结构的节点都会被认为是相同节点，然后会比对当前节点子节点是否相同，如果不相同就需要更新；此时以在一个list头部添加一个节点为例，每个旧的节点都会执行一次DOM更新操作；
2. 加key，diff算法的时候根据key，会先找到相同key的节点，然后对比子节点差异，发现一致后不会执行更新DOM操作，直到遍历完旧vnode，剩余的新的vnode会一次性插入DOM中，最终只执行了一次DOM 操作；
　

　

#### 4、请简述 Vue 中模板编译的过程。

1. compileToFunctions(template, ...)：模板编译的入口函数，先从缓存中加载编译好的render函数，如果缓冲中没有，则调用compile(template,options)开始编译；

2. compile(template,options)：先合并选项options，再调用baseCompile(template.trim(),finalOptions)编译模板；compile的核心是合并options，真正处理模板是在baseCompile中完成的，把模板和合并好的选项传给baseCompile。

3. baseCompile(template.trim(),finalOptions)：先调用parse()把template转换成AST tree；然后调用optimize()优化AST，先标记AST tree中的静态子树，检测到静态子树，设置为静态，不需要在每次重新渲染的时候重新生成节点，patch阶段跳过静态子树；调用generate()将ASTtree生成js代码；

4. compileToFunctions(template,...)：继续把上一步中生成的字符串形式的js代码转换为函数，调用createFunction()将字符串转换成函数；render和staticRenderFns初始化完毕，挂载到Vue实例的options对应的属性中。
　

　

　