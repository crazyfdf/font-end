## 简答



#### 1. 请简述 React 16 版本中初始渲染的流程
>React 16渲染过程可以分为 Scheduler、Reconciliation、Commit 这三个阶段
- Scheduer （调度层）:流程主要是创建更新
- render （协调层）:此阶段负责为每一个react元素创建 Fiber 数据结构并为 Fiber 节点打标记effectTag属性，存储当前 Fiber 节点要进行的 DOM 操作 ,然后在render 结束后， fiber 会被保存到 fiberroot 中
- commit（渲染层）:先获取到render 的结果， 根据 fiber 中的 effectTag 属性进行相应的 DOM 操作，此阶段是不可以被打断的


　

#### 2. 为什么 React 16 版本中 render 阶段放弃了使用递归

- 使用递归的时候，由于递归是无法打断的，一旦开始执行，程序就会一直占用线程，又因为js是单线程语言，导致在递归时，如果发生用户交互行为，页面将无法相应用户行为，造成用户体验上的卡顿。
- 在React16中，使用循环代替递归，当页面发生用户交互行为，循环可以被打断，优先执行用户交互行为，大大提升了用户体验。之后被打断的循环可以再次执行已完成程序的运行。
　

　

#### 3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情
- before mutation阶段（执行DOM操作前）
  - 主要调用类组件生命周期函数
  - etSnapshotBeforeUpdate,并且把旧的props和旧的states传递进去
- mutation阶段（执行DOM操作）

  - 获取对象得effects，根据不同的 effectTag 执行不同的操作
    - 插入节点：commitPlacement
    - 更新节点：commitWork
    - 删除节点：commitDeletion
- layout阶段（执行DOM操作后）

  - 调用类组件的生命周期函数
    - 初次渲染阶段调用componentDidMount生命周期函数
    - 更新阶段调用componentDidUpdate生命周期函数
    - 执行渲染完成之后的回调函数，也就是render函-数的第三个参数，并且更改this指向，指向render方法的第一个参数
  - 调用函数组件的钩子函数
    - firstEffect：指向第一个更新的节点
    - nextEffect：指向下一个更新的节点
　

　

#### 4. 请简述 workInProgress Fiber 树存在的意义是什么

　
- React 使用双缓存技术完成 Fiber 树的构建与替换，实现DOM对象的快速更新。
- 在 React 中最多会同时存在两棵 Fiber 树，当前在屏幕中显示的内容对应的 Fiber 树叫做 current Fiber 树，当发生更新时，React 会在内存中重新构建一颗新的 Fiber 树，这颗正在构建的 Fiber 树叫做 workInProgress Fiber 树。在双缓存技术中，workInProgress Fiber 树就是即将要显示在页面中的 Fiber 树，当这颗 Fiber 树构建完成后，React 会使用它直接替换 current Fiber 树达到快速更新 DOM 的目的，因为 workInProgress Fiber 树是在内存中构建的所以构建它的速度是非常快的。一旦 workInProgress Fiber 树在屏幕上呈现，它就会变成 current Fiber 树。
- 在 current Fiber 节点对象中有一个 alternate 属性指向对应的 workInProgress Fiber 节点对象，在 workInProgress Fiber 节点中有一个 alternate 属性也指向对应的 current Fiber 节点对象。
　