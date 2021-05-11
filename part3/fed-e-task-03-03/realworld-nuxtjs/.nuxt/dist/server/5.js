exports.ids = [5];
exports.modules = {

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/login/index.vue?vue&type=template&id=91cfe314&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"auth-page"},[_vm._ssrNode("<div class=\"container page\" data-v-91cfe314>","</div>",[_vm._ssrNode("<div class=\"row\" data-v-91cfe314>","</div>",[_vm._ssrNode("<div class=\"col-md-6 offset-md-3 col-xs-12\" data-v-91cfe314>","</div>",[_vm._ssrNode("<h1 class=\"text-xs-center\" data-v-91cfe314>"+_vm._ssrEscape(" "+_vm._s(_vm.isLogin?'Sign in':'Sign up')+"\n        ")+"</h1> "),_vm._ssrNode("<p class=\"text-xs-center\" data-v-91cfe314>","</p>",[(_vm.isLogin)?_c('nuxt-link',{attrs:{"to":"/register"}},[_vm._v("Need an account?")]):_c('nuxt-link',{attrs:{"to":"/login"}},[_vm._v("Have an account?")])],1),_vm._ssrNode(" <ul class=\"error-messages\" data-v-91cfe314>"+(_vm._ssrList((_vm.error),function(messages,field){return ((_vm._ssrList((messages),function(message,index){return ("<li data-v-91cfe314>"+_vm._ssrEscape("\n              "+_vm._s(field)+" "+_vm._s(message)+"\n            ")+"</li>")})))}))+"</ul> <form data-v-91cfe314>"+((!_vm.isLogin)?("<fieldset class=\"form-group\" data-v-91cfe314><input type=\"text\" placeholder=\"Your Name\" required=\"required\""+(_vm._ssrAttr("value",(_vm.users.username)))+" class=\"form-control form-control-lg\" data-v-91cfe314></fieldset>"):"<!---->")+" <fieldset class=\"form-group\" data-v-91cfe314><input type=\"text\" placeholder=\"Email\" required=\"required\""+(_vm._ssrAttr("value",(_vm.users.email)))+" class=\"form-control form-control-lg\" data-v-91cfe314></fieldset> <fieldset class=\"form-group\" data-v-91cfe314><input type=\"password\" placeholder=\"Password\" minlength=\"8\" required=\"required\""+(_vm._ssrAttr("value",(_vm.users.password)))+" class=\"form-control form-control-lg\" data-v-91cfe314></fieldset> <button class=\"btn btn-lg btn-primary pull-xs-right\" data-v-91cfe314>"+_vm._ssrEscape("\n            "+_vm._s(_vm.isLogin?'Sign in':'Sign up')+"\n          ")+"</button></form>")],2)])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/login/index.vue?vue&type=template&id=91cfe314&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/login/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var loginvue_type_script_lang_js_ = ({
  middleware: "notAuthenticated",
  name: "login",

  data() {
    return {
      users: {
        email: "",
        username: "",
        password: ""
      },
      error: {} // 错误信息

    };
  },

  computed: {
    isLogin() {
      return this.$route.name === "login";
    }

  },
  methods: {
    async onSubmit() {
      try {
        let url = this.isLogin ? "users/login" : "users/register";
        const {
          data
        } = await this.$uct.api(url, {
          user: this.users
        });
        console.log(data.user);
        this.$uct.vuex("user", data.user);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.error = error.response.data.errors;
      }
    }

  }
});
// CONCATENATED MODULE: ./pages/login/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_loginvue_type_script_lang_js_ = (loginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./pages/login/index.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_loginvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "91cfe314",
  "26c11453"
  
)

/* harmony default export */ var login = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=5.js.map