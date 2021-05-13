<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{article.title}}</h1>

        <article-meta :article="article"></article-meta>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12"
             v-html="article.body">
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form"
                @submit.prevent="onSubmit">
            <div class="card-block">
              <textarea class="form-control"
                        v-model="comment.body"
                        placeholder="Write a comment..."
                        rows="3"
                        required></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image"
                   class="comment-author-img" />
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>
          <error-component :error="error"></error-component>
          <article-comments :article="article"></article-comments>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { getArticles, createComments } from "/request/api.js";
import MarkdownIt from "markdown-it";
import articleMeta from "./components/article-meta.vue";
import ArticleComments from "./components/article-comments.vue";
import ErrorComponent from "../../components/error-component.vue";
export default {
  components: { articleMeta, ArticleComments, ErrorComponent },
  name: "article",
  async asyncData({ params }) {
    const { data } = await getArticles(params.slug);
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article,
      slug: params.slug,
    };
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
  data() {
    return {
      error: {},
      comment: {
        body: "",
      },
    };
  },
  methods: {
    onSubmit() {
      try {
        createComments(this.slug, this.comment);
      } catch (error) {
        console.log(error);
        this.error = error.response.data.errors;
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>