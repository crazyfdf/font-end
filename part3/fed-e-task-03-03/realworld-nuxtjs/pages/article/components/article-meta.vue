<template>
  <div class="article-meta">
    <nuxt-link :to="{name:'profile',params:{
      username:article.author.username
    }}"><img :src="article.author.image||altImage" /></nuxt-link>
    <div class="info">
      <nuxt-link class="author"
                 :to="{name:'profile',params:{
      username:article.author.username
    }}">{{article.author.username}}</nuxt-link>
      <span class="date">{{article.author.createdAt|date('MMM DD,YYYY')}}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary"
            @click="follow"
            :class="{active:article.author.following}"
            v-if="user&&article.author.username!==user.username">
      <i class="ion-plus-round"></i>
      &nbsp;
      {{article.author.following?'Unfollow':'Follow'}} {{article.author.username}}
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary"
            @click="onFavorite(article)"
            :class="{active:article.author.favorited}">
      <i class="ion-heart"></i>
      &nbsp;
      {{article.favorited?'Unfavorite':'Favorite'}} <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
import {
  addFollow,
  deleteFollow,
  addFavorite,
  deleteFavorite,
} from "/request/api.js";
export default {
  name: "article-meta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async follow() {
      this.article.author.followed = true;
      if (!this.article.author.following) {
        await addFollow(this.article.author.username);
        this.article.author.followed = false;
        this.article.author.following = true;
      } else {
        await deleteFollow(this.article.author.username);
        this.article.author.followed = false;
        this.article.author.following = false;
      }
    },
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