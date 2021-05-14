<template>
  <div>
    <div class="card"
         v-for="comment in comments"
         :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{name:'profile',params:{username:comment.author.username}}"
                   class="comment-author">
          <img :src="comment.author.image||altImage"
               class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{name:'profile',params:{username:comment.author.username}}"
                   class="comment-author">{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt|date('MMM DD,YYYY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from "/request/api.js";
export default {
  name: "article-comments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      comments: [], //文章列表
    };
  },
  methods: {
    async init() {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
  },
};
</script>

<style scoped lang="scss">
</style>