exports.ids = [3];
exports.modules = {

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/home/index.vue?vue&type=template&id=9fdd873c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"home-page"},[_vm._ssrNode("<div class=\"banner\" data-v-9fdd873c><div class=\"container\" data-v-9fdd873c><h1 class=\"logo-font\" data-v-9fdd873c>conduit</h1> <p data-v-9fdd873c>A place to share your knowledge.</p></div></div> "),_vm._ssrNode("<div class=\"container page\" data-v-9fdd873c>","</div>",[_vm._ssrNode("<div class=\"row\" data-v-9fdd873c>","</div>",[_vm._ssrNode("<div class=\"col-md-9\" data-v-9fdd873c>","</div>",[_vm._ssrNode("<div class=\"feed-toggle\" data-v-9fdd873c>","</div>",[_vm._ssrNode("<ul class=\"nav nav-pills outline-active\" data-v-9fdd873c>","</ul>",[(_vm.user)?_vm._ssrNode("<li class=\"nav-item\" data-v-9fdd873c>","</li>",[_c('nuxt-link',{staticClass:"nav-link",class:{'active':_vm.tab==='your_feed'},attrs:{"exact":"","to":{name:'home',query:{tab:'your_feed'}}}},[_vm._v("Your Feed")])],1):_vm._e(),_vm._ssrNode(" "),_vm._ssrNode("<li class=\"nav-item\" data-v-9fdd873c>","</li>",[_c('nuxt-link',{staticClass:"nav-link",class:{'active':_vm.tab==='global_feed'},attrs:{"exact":"","to":{name:'home',query:{tab:'global_feed'}}}},[_vm._v("Global Feed")])],1),_vm._ssrNode(" "),(_vm.tag)?_vm._ssrNode("<li class=\"nav-item\" data-v-9fdd873c>","</li>",[_c('nuxt-link',{staticClass:"nav-link",class:{'active':_vm.tab==='tag'},attrs:{"to":{name:'home',query:{tab:'tag'}}}},[_vm._v("# "+_vm._s(_vm.tag)+" ")])],1):_vm._e()],2)]),_vm._ssrNode(" "),_vm._l((_vm.articles),function(article){return _vm._ssrNode("<div class=\"article-preview\" data-v-9fdd873c>","</div>",[_vm._ssrNode("<div class=\"article-meta\" data-v-9fdd873c>","</div>",[_c('nuxt-link',{attrs:{"to":{name:'profile',params:{username:article.author.username}}}},[_c('img',{attrs:{"src":article.author.image}})]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"info\" data-v-9fdd873c>","</div>",[_c('nuxt-link',{staticClass:"author",attrs:{"to":{name:'profile',params:{username:article.author.username}}}},[_vm._v(_vm._s(article.author.username))]),_vm._ssrNode(" <span class=\"date\" data-v-9fdd873c>"+_vm._ssrEscape(_vm._s(_vm._f("date")(article.createdAt,'MMM DD,YYYY')))+"</span>")],2),_vm._ssrNode(" <button"+(_vm._ssrAttr("disabled",article.favoriteDisable))+(_vm._ssrClass("btn btn-outline-primary btn-sm pull-xs-right",{'active':article.favorited}))+" data-v-9fdd873c><i class=\"ion-heart\" data-v-9fdd873c></i>"+_vm._ssrEscape(" "+_vm._s(article.favoritesCount)+"\n            ")+"</button>")],2),_vm._ssrNode(" "),_c('nuxt-link',{staticClass:"preview-link",attrs:{"to":{name:'article',params:{slug:article.slug}}}},[_c('h1',[_vm._v(_vm._s(article.title))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(article.description))]),_vm._v(" "),_c('span',[_vm._v("Read more...")])])],2)}),_vm._ssrNode(" "),_vm._ssrNode("<nav data-v-9fdd873c>","</nav>",[_vm._ssrNode("<ul class=\"pagination\" data-v-9fdd873c>","</ul>",_vm._l((_vm.totalPage),function(item){return _vm._ssrNode("<li"+(_vm._ssrClass("page-item",{'active':item==_vm.page}))+" data-v-9fdd873c>","</li>",[_c('nuxt-link',{staticClass:"page-link",attrs:{"to":{name:'home',query:{page:item,tag:_vm.$route.query.tag,tab:_vm.tab}}}},[_vm._v(_vm._s(item))])],1)}),0)])],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"col-md-3\" data-v-9fdd873c>","</div>",[_vm._ssrNode("<div class=\"sidebar\" data-v-9fdd873c>","</div>",[_vm._ssrNode("<p data-v-9fdd873c>Popular Tags</p> "),_vm._ssrNode("<div class=\"tag-list\" data-v-9fdd873c>","</div>",_vm._l((_vm.tags),function(item){return _c('nuxt-link',{key:item,staticClass:"tag-pill tag-default",attrs:{"to":{name:'home',query:{tag:item,tab:'tag'}}}},[_vm._v(_vm._s(item))])}),1)],2)])],2)])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/home/index.vue?vue&type=template&id=9fdd873c&scoped=true&

// EXTERNAL MODULE: ./plugins/request.js
var request = __webpack_require__(2);

// EXTERNAL MODULE: ./request/api.js
var api = __webpack_require__(9);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/home/index.vue?vue&type=script&lang=js&
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


/* harmony default export */ var homevue_type_script_lang_js_ = ({
  name: "home",

  async asyncData({
    query,
    store
  }) {
    const page = Number.parseInt(query.page) || 1;
    const limit = 20;
    const tag = query.tag;
    const tab = query.tab || "global_feed";
    const loadArticles = store.state.user && tab === "your_feed" ? Object(request["a" /* api */])("articles/feed") : Object(request["a" /* api */])("articles/getArticles", {
      limit,
      offset: (page - 1) * limit,
      tag
    });
    const [articleRes, tagRes] = await Promise.all([loadArticles, Object(request["a" /* api */])("tags/getTags")]);
    const {
      articles,
      articlesCount
    } = articleRes.data;
    const {
      tags
    } = tagRes.data;
    articles.forEach(item => {
      item.favoriteDisable = false;
    });
    return {
      limit,
      page,
      tags,
      tag,
      articles,
      articlesCount,
      tab
    };
  },

  watchQuery: ["page", "tag", "tab"],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }

  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisable = true;

      if (article.favorited) {
        await Object(api["c" /* deleteFavorite */])(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        await Object(api["a" /* addFavorite */])(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }

      article.favoriteDisable = false;
    }

  }
});
// CONCATENATED MODULE: ./pages/home/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_homevue_type_script_lang_js_ = (homevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./pages/home/index.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_homevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "9fdd873c",
  "7e6ce591"
  
)

/* harmony default export */ var home = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=3.js.map