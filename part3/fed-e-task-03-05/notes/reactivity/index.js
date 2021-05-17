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
