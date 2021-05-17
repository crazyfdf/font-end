## 简答题

（请直接在本文件中作答）

#### 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

1. 响应式系统升级
  - vue2中响应式的原理defineProperty，在初始化的时候会遍历data中的所有成员，把对象的属性转化为getter、setter，如果data中的属性是对象的话，需要继续递归对象的所有属性。
  - vue3中使用的是proxy对象，性能比defineProperty好，而且可以监听对象属性的访问，赋值，删除等操作，不需要初始化时遍历每一个属性，如果有多层属性嵌套的话，只有访问某个属性的时候，才会递归处理下一级属性，使用proxy对象默认就可以监听到动态添加的属性，而vue2需要vue.set处理。
2. 编译优化
  - vue2通过标记静态根节点，diff的时候会跳过静态根节点来优化diff，但是静态节点还需要diff
  - vue3中通过标记和提升所有的静态根节点，diff的时候会跳过静态根节点，只需要对比动态节点内容；对事件处理函数进行缓存，减少了不必要的更新操作,组件不再需要根节点。
3. 源码体积的优化
　- vue3移除了一些不常用的API，例如：inline-template、filter等
  - Tree-shaking支持更好，tree-shaking依赖ES module，通过import export,通过编译阶段的静态分析，找到没有引入的模块，在打包的时候过滤掉。打包体积会更小。
　

　

#### 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？
1. 方法
  - Options API:data, methods, props,filter,computed, watch,components等
  - Composition API:setup, reactive,  toRefs, Ref, computed, watch, watchEffect等

2. 生命周期
  - Options API:beforeCreate, created, beforeMount, mounted,beforeUpdate,updated,
  beforeUnmount,unmounted,errorCaptured,renderTracked,renderTriggered
  - Composition API:onBeforeMount,onMounted,onUpdated,onBeforeUnmount,onUnmounted,onErrorCaptured,onRenderTracked,onRenderTriggered

3. 组件逻辑模块
  - Options API:同一个功能的代码可能涉及到data、methods、props、computed等多个模块，也就是同一个功能的代码被拆分到多个模块中
  - Composition API：可以更灵活的组织代码逻辑，将当前功能的逻辑封装在一个函数中，查看的时候只需要找到该功能所对应的函数就行



　

　

#### 3、Proxy 相对于 Object.defineProperty 有哪些优点？

1. Proxy的优势:
  - proxy可以直接监听对象，数组的变化。
  - proxy的性能比defineProperty好。
  - defineProperty只能遍历对象属性直接修改，而proxy返回的是一个proxy代理对象，只需要对代理对象做操作。
2. defineProperty的优势与不足：
  - 优势：兼容IE9
  - 不足：
    1. 只能劫持对象的属性，需要对对象的每一个属性遍历操作。
    2. 不能监听数组，如vue2监听数组需要通过重写数组的方法。
    3. 不能监听修改内部数据，删除操作，不能监听数组改变length的值，vue2通过Vue.set()方法来实现响应式。

　

　

#### 4、Vue 3.0 在编译方面有哪些优化？
1. vue2
  - vue2通过标记静态根节点，diff的时候会跳过静态根节点来优化diff，但是静态节点还需要diff
2. vue3
  - vue3中通过标记和提升所有的静态根节点，diff的时候会跳过静态根节点，只需要对比动态节点内容
。
  - 对事件处理函数进行缓存，减少了不必要的更新操作。
  - 新引入Fragments（片段）特性：Vue 3.x 模板中不需要再创建一个唯一的根节点，模板里可以直接放文本内容或者很多同级的标签, Vue2.x 需要唯一的节点。
  - 通过Patch flag标记模板编译时的动态标签，并标识动态的属性类型有哪些，当动态属性发生改变，只需要重新渲染当前的标签。
　

　

#### 5、Vue.js 3.0 响应式系统的实现原理？
>vue3使用Proxy和reactive、effect、track、trigger、ref、toRefs、computed等方法重写了响应式系统。
代码：
```
// 判断是否是对象
const isObject = val => val !== null && typeof val === "object";
// 将对象变成响应式对象
const convert = target => (isObject(target) ? reactive(target) : target);
const hasOwnProperty = Object.prototype.hasOwnProperty;
// 判断对象是否存在某属性
const hasOwn = (target, key) => hasOwnProperty.call(target, key);

/**
 * @description: 接收一个参数，判断这参数是否是对象。不是对象则直接返回这个参数，不做响应式处理，创建拦截器对象handler,设置get/set/deleteProperty
 * @param {*} target 接收的对象
 * @return {proxy} 返回proxy对象
 */
export function reactive(target) {
  if (!isObject(target)) return target;
  const handler = {
    /**
     * @description: 收集依赖track
     * @return {*} 返回当前key值
     */
    get(target, key, receiver) {
      // 收集依赖
      track(target, key);
      const result = Reflect.get(target, key, receiver);
      return convert(result);
    },
    /**
     * @description: 设置的新值和旧值不相等时，更新为新值，并触发更新（trigger）
     */
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      let result = true;
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver);
        // 触发更新
        trigger(target, key);
      }
      return result;
    },
    /**
     * @description: 当前对象有这个 key 的时候，删除这个 key 并触发更新（trigger）
     */
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key);
      if (hadKey && result) {
        // 触发更新
        trigger(target, key);
      }
      return result;
    },
  };
  return new Proxy(target, handler);
}

// 当前活动的effect函数
let activeEffect = null;
export function effect(callback) {
  activeEffect = callback;
  callback(); //访问响应式对象属性，去收集依赖
  activeEffect = null;
}

let targetMap = new WeakMap();
/**
 * @description: 收集依赖,将activeEffect存入dep
 */
export function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // 创建depsMap
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    // 创建dep
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect);
}

/**
 * @description: 触发更新
 */
export function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => {
      effect();
    });
  }
}

/**
 * @description: 创建对象，可接收原始值或对象，如果是对象，调用reactive将对象变成响应式对象
 * @param {*} raw
 * @return {*}
 */
export function ref(raw) {
  // 判断raw是否是ref创建的对象，如果是的话直接返回
  if (isObject(raw) && raw.__v_isRef) {
    return;
  }
  let value = convert(raw);
  const r = {
    __v_isRef: true,
    get value() {
      track(r, "value");
      return value;
    },
    set value(newValue) {
      if (newValue !== value) {
        raw = newValue;
        value = convert(raw);
        trigger(r, "value");
      }
    },
  };
  return r;
}

/**
 * @description: 将reactive返回的每一个属性转换为类似ref返回的对象。
 * @param {*} proxy
 * @return {*}
 */
export function toRefs(proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {};
  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key);
  }
  return ret;
}

function toProxyRef(proxy, key) {
  const r = {
    __v_isRef: true,
    get value() {
      return proxy[key];
    },
    set value(newValue) {
      proxy[key] = newValue;
    },
  };
  return r;
}

/**
 * @description: 通过effect监听getter内部响应式数据的变化，getter中访问响应式数据属性的时候收集依赖，当数据发送变化后重新执行effect函数，把getter的结果存到result中
 * @param {*} getter
 * @return {*}
 */
export function computed(getter) {
  const result = ref();
  effect(() => (result.value = getter()));
  return result;
}
```
　

　

　