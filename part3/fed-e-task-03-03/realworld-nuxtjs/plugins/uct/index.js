import { api } from "../request.js";
import store from "/store/store.mixin.js";
import dayjs from "dayjs";
import Vue from "vue";
const $uct = {
  api,
};

const install = Vue => {
  Vue.mixin(store);
  Vue.filter("date", (value, format = "YYYY-MM-DD HH:mm:ss") => {
    return dayjs(value).format(format);
  });
  Vue.prototype.$uct = $uct;
};
export default {
  install,
};
