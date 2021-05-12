const Cookie = process.client ? require("js-cookie") : undefined;
const cookieparser = process.server ? require("cookieparser") : undefined;
// 需要永久存储，在state中的变量名
let saveStateKeys = ["user"];
// 获取本地存储中的变量
const getStorage = function(key) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    return Cookie.get(key);
  }
};

const saveStorage = function(key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    try {
      if (!Cookie.get(key)) {
        Cookie.set(key, value);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const state = () => {
  return { user: null };
};

const mutations = {
  _commitAll(state, payload) {
    console.log(payload);
    // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
    let nameArr = payload.name.split(".");
    let saveKey = "";
    let len = nameArr.length;
    if (len >= 2) {
      let obj = state[nameArr[0]];
      for (let i = 1; i < len - 1; i++) {
        obj = obj[nameArr[i]];
      }
      obj[nameArr[len - 1]] = payload.value;
      saveKey = nameArr[len - 1];
    } else {
      // 单层级变量，在state就是一个普通变量的情况
      state[payload.name] = payload.value;
      saveKey = payload.name;
    }
    // 保存变量到本地，见顶部函数定义
    saveStorage(saveKey, payload.value);
  },
  serUser(state, value) {
    state.user = value;
  },
};

const actions = {
  /* 刷新时调用，将头部登录的用户信息存入vuex */
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user);
      } catch (error) {
        console.log(error);
      }
    }
    // commit("_commitAll", { name: "user", value: user });
    commit("serUser", user);
  },
};

export default {
  state,
  mutations,
  actions,
};
