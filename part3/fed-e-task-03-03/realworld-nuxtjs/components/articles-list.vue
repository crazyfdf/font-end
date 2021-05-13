<template>
  <div>
    <div class="article-preview"
         v-for="article in articles"
         :key="article.slug">
      <div class="article-meta">
        <nuxt-link :to="{name:'profile',params:{username:article.author.username}}"><img :src="article.author.image" /></nuxt-link>
        <div class="info">
          <nuxt-link :to="{name:'profile',params:{username:article.author.username}}"
                     class="author">{{article.author.username}}</nuxt-link>
          <span class="date">{{article.createdAt|date('MMM DD,YYYY')}}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{'active':article.favorited}"
                :disabled="article.favoriteDisable"
                @click="onFavorite(article)">
          <i class="ion-heart"></i> {{article.favoritesCount}}
        </button>
      </div>
      <nuxt-link :to="{name:'article',params:{slug:article.slug}}"
                 class="preview-link">
        <h1>{{article.title}}</h1>
        <p>{{article.description}}</p>
        <span>Read more...</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite } from "/request/api.js";
export default {
  name: "articles-list",
  components: {},
  props: {
    articles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onFavorite(article) {
      article.favoriteDisable = true;
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisable = false;
    },
  },
};
</script>

<style scoped lang="scss">
</style>