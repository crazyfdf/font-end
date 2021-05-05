class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el);
  }
  // 编译模板,处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        // 处理文本节点
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node);
      }
      // 判断node节点是否有子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }
  // 编译文本节点,处理差值表达式
  compileText(node) {
    let reg = /\{\{(.+?)\}\}/;
    let value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);

      // 创建watcher对象，当数据改变更新视图
      new Watcher(this.vm, key, newValue => {
        node.textContent = newValue;
      });
    }
  }
  // 编译元素节点,处理指令
  compileElement(node) {
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.name;
      // 判断是否是指令
      if (this.isDirective(attrName)) {
        attrName = attrName.substr(2);
        let key = attr.value;
        this.update(node, key, attrName);
      }
    });
  }
  update(node, key, attrName) {
    // 处理事件绑定的冒号
    let eventType = "";
    let value = this.vm[key];
    if (attrName.indexOf(":") !== -1) {
      [attrName, eventType] = attrName.split(":");
      value = this.vm.$options.methods[key];
    }
    let updateFn = this[attrName + "Updater"];
    updateFn && updateFn.call(this, node, key, value, eventType);
  }

  // 处理v-text指令
  textUpdater(node, key, value) {
    node.textContent = value;
    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue;
    });
  }

  // 处理v-model指令
  modelUpdater(node, key, value) {
    node.value = value;
    new Watcher(this.vm, key, newValue => {
      node.value = newValue;
    });
    node.addEventListener("input", () => {
      this.vm[key] = node.value;
    });
  }

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

  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    // console.log(node);
    return node.nodeType === 1;
  }
}
