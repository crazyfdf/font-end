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
