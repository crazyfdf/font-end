exports.ids = [1];
exports.modules = {

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/article/index.vue?vue&type=template&id=2a6128e1&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"article-page"},[_vm._ssrNode("<div class=\"banner\" data-v-2a6128e1>","</div>",[_vm._ssrNode("<div class=\"container\" data-v-2a6128e1>","</div>",[_vm._ssrNode("<h1 data-v-2a6128e1>"+_vm._ssrEscape(_vm._s(_vm.article.title))+"</h1> "),_c('article-meta',{attrs:{"article":_vm.article}})],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"container page\" data-v-2a6128e1>","</div>",[_vm._ssrNode("<div class=\"row article-content\" data-v-2a6128e1><div class=\"col-md-12\" data-v-2a6128e1>"+(_vm._s(_vm.article.body))+"</div></div> <hr data-v-2a6128e1> "),_vm._ssrNode("<div class=\"article-actions\" data-v-2a6128e1>","</div>",[_c('article-meta',{attrs:{"article":_vm.article}})],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"row\" data-v-2a6128e1>","</div>",[_vm._ssrNode("<div class=\"col-xs-12 col-md-8 offset-md-2\" data-v-2a6128e1>","</div>",[_vm._ssrNode("<form class=\"card comment-form\" data-v-2a6128e1><div class=\"card-block\" data-v-2a6128e1><textarea placeholder=\"Write a comment...\" rows=\"3\" class=\"form-control\" data-v-2a6128e1></textarea></div> <div class=\"card-footer\" data-v-2a6128e1><img src=\"http://i.imgur.com/Qr71crq.jpg\" class=\"comment-author-img\" data-v-2a6128e1> <button class=\"btn btn-sm btn-primary\" data-v-2a6128e1>\n              Post Comment\n            </button></div></form> "),_c('article-comments',{attrs:{"article":_vm.article}})],2)])],2)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/article/index.vue?vue&type=template&id=2a6128e1&scoped=true&

// EXTERNAL MODULE: ./request/api.js
var api = __webpack_require__(9);

// EXTERNAL MODULE: external "markdown-it"
var external_markdown_it_ = __webpack_require__(28);
var external_markdown_it_default = /*#__PURE__*/__webpack_require__.n(external_markdown_it_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/article/components/article-meta.vue?vue&type=template&id=31274a9f&scoped=true&
var article_metavue_type_template_id_31274a9f_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"article-meta"},[_c('nuxt-link',{attrs:{"to":{name:'profile',params:{
    username:_vm.article.author.username
  }}}},[_c('img',{attrs:{"src":_vm.article.author.image}})]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"info\" data-v-31274a9f>","</div>",[_c('nuxt-link',{staticClass:"author",attrs:{"to":{name:'profile',params:{
    username:_vm.article.author.username
  }}}},[_vm._v(_vm._s(_vm.article.author.username))]),_vm._ssrNode(" <span class=\"date\" data-v-31274a9f>"+_vm._ssrEscape(_vm._s(_vm._f("data")(_vm.article.author.createdAt,'MMM DD,YYYY')))+"</span>")],2),_vm._ssrNode(" <button"+(_vm._ssrClass("btn btn-sm btn-outline-secondary",{active:_vm.article.author.following}))+" data-v-31274a9f><i class=\"ion-plus-round\" data-v-31274a9f></i>\n     \n    Follow Eric Simons <span class=\"counter\" data-v-31274a9f>(10)</span></button>\n    \n  <button"+(_vm._ssrClass("btn btn-sm btn-outline-primary",{active:_vm.article.author.favorited}))+" data-v-31274a9f><i class=\"ion-heart\" data-v-31274a9f></i>\n     \n    Favorite Post <span class=\"counter\" data-v-31274a9f>(29)</span></button>")],2)}
var article_metavue_type_template_id_31274a9f_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./pages/article/components/article-meta.vue?vue&type=template&id=31274a9f&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/article/components/article-meta.vue?vue&type=script&lang=js&
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
/* harmony default export */ var article_metavue_type_script_lang_js_ = ({
  name: "article-meta",
  props: {
    article: {
      type: Object,
      required: true
    }
  }
});
// CONCATENATED MODULE: ./pages/article/components/article-meta.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_article_metavue_type_script_lang_js_ = (article_metavue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(4);

// CONCATENATED MODULE: ./pages/article/components/article-meta.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_article_metavue_type_script_lang_js_,
  article_metavue_type_template_id_31274a9f_scoped_true_render,
  article_metavue_type_template_id_31274a9f_scoped_true_staticRenderFns,
  false,
  injectStyles,
  "31274a9f",
  "7fa4b060"
  
)

/* harmony default export */ var article_meta = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./pages/article/components/article-comments.vue?vue&type=template&id=792334a0&scoped=true&
var article_commentsvue_type_template_id_792334a0_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._l((_vm.comments),function(comment){return _vm._ssrNode("<div class=\"card\" data-v-792334a0>","</div>",[_vm._ssrNode("<div class=\"card-block\" data-v-792334a0><p class=\"card-text\" data-v-792334a0>"+_vm._ssrEscape(_vm._s(comment.body))+"</p></div> "),_vm._ssrNode("<div class=\"card-footer\" data-v-792334a0>","</div>",[_c('nuxt-link',{staticClass:"comment-author",attrs:{"to":{name:'profile',params:{username:comment.author.username}}}},[_c('img',{staticClass:"comment-author-img",attrs:{"src":comment.author.image}})]),_vm._ssrNode("\n       \n      "),_c('nuxt-link',{staticClass:"comment-author",attrs:{"to":{name:'profile',params:{username:comment.author.username}}}},[_vm._v(_vm._s(comment.author.username))]),_vm._ssrNode(" <span class=\"date-posted\" data-v-792334a0>"+_vm._ssrEscape(_vm._s(_vm._f("data")(_vm.commente.createdAt,'MMM DD,YYYY')))+"</span>")],2)],2)}),0)}
var article_commentsvue_type_template_id_792334a0_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./pages/article/components/article-comments.vue?vue&type=template&id=792334a0&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/article/components/article-comments.vue?vue&type=script&lang=js&
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

/* harmony default export */ var article_commentsvue_type_script_lang_js_ = ({
  name: "article-comments",
  props: {
    article: {
      type: Object,
      required: true
    }
  },

  async mounted() {
    const {
      data
    } = await Object(api["e" /* getComments */])(this.article.slug);
    this.comments = data.comments;
  },

  data() {
    return {
      comments: [] //文章列表

    };
  },

  methods: {}
});
// CONCATENATED MODULE: ./pages/article/components/article-comments.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_article_commentsvue_type_script_lang_js_ = (article_commentsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./pages/article/components/article-comments.vue



function article_comments_injectStyles (context) {
  
  
}

/* normalize component */

var article_comments_component = Object(componentNormalizer["a" /* default */])(
  components_article_commentsvue_type_script_lang_js_,
  article_commentsvue_type_template_id_792334a0_scoped_true_render,
  article_commentsvue_type_template_id_792334a0_scoped_true_staticRenderFns,
  false,
  article_comments_injectStyles,
  "792334a0",
  "de066282"
  
)

/* harmony default export */ var article_comments = (article_comments_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/article/index.vue?vue&type=script&lang=js&
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




/* harmony default export */ var articlevue_type_script_lang_js_ = ({
  components: {
    articleMeta: article_meta,
    ArticleComments: article_comments
  },
  name: "article",

  async asyncData({
    params
  }) {
    const {
      data
    } = await Object(api["d" /* getArticles */])(params.slug);
    const {
      article
    } = data;
    const md = new external_markdown_it_default.a();
    article.body = md.render(article.body);
    return {
      article
    };
  },

  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [{
        hid: "description",
        name: "description",
        content: this.article.description
      }]
    };
  }

});
// CONCATENATED MODULE: ./pages/article/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_articlevue_type_script_lang_js_ = (articlevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./pages/article/index.vue



function article_injectStyles (context) {
  
  
}

/* normalize component */

var article_component = Object(componentNormalizer["a" /* default */])(
  pages_articlevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  article_injectStyles,
  "2a6128e1",
  "899c22c0"
  
)

/* harmony default export */ var pages_article = __webpack_exports__["default"] = (article_component.exports);

/***/ })

};;
//# sourceMappingURL=1.js.map