<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image"
                 class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
              {{profile.bio}}
            </p>
            <button class="btn btn-sm btn-outline-secondary"
                    :class="{active:profile.following}"
                    @click="follow"
                    :disabled="profile.followed"
                    v-if="user&&profile.username!==user.username">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{profile.following?'Unfollow':'Follow'}} {{profile.username}}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           exact
                           :class="{'active':tab==='My Articles'}"
                           :to="{path:`/profile/${profile.username}`,query:{tab:'My Articles'}}">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           exact
                           :class="{'active':tab==='Favorited Articles'}"
                           :to="{path:`/profile/${profile.username}`,query:{tab:'Favorited Articles'}}">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <articles-list :articles="articles"></articles-list>
          <!-- 分页 -->
          <nav>
            <ul class="pagination">
              <li class="page-item"
                  :class="{'active':item==page}"
                  v-for="item in totalPage"
                  :key="item">
                <nuxt-link class="page-link"
                           :to="{path:`/profile/${profile.username}`,query:{page:item,tab:tab}}">{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页 -->
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import articlesList from "../../components/articles-list.vue";
import { getUser, addFollow, deleteFollow } from "/request/api.js";
import { api } from "/plugins/request.js";
export default {
  components: { articlesList },
  async asyncData({ store, route, query }) {
    const page = Number.parseInt(query.page) || 1;
    const limit = 20;
    const tab = query.tab || "My Articles";
    const { data: userdata } = await getUser(route.params.username);
    const { profile } = userdata;
    let getArticles;
    if (tab === "Favorited Articles") {
      getArticles = await api("articles/getArticles", {
        limit,
        offset: (page - 1) * limit,
        favorited: route.params.username,
      });
    } else {
      getArticles = await api("articles/getArticles", {
        limit,
        offset: (page - 1) * limit,
        author: route.params.username,
      });
    }
    const { articles, articlesCount } = getArticles.data;
    return {
      page,
      limit,
      tab,
      profile,
      articles,
      articlesCount,
    };
  },
  middleware: "authenticated",
  name: "profile",
  watchQuery: ["page", "tab"],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async follow() {
      this.profile.followed = true;
      if (!this.profile.following) {
        await addFollow(this.profile.username);
        this.profile.followed = false;
        this.profile.following = true;
      } else {
        await deleteFollow(this.profile.username);
        this.profile.followed = false;
        this.profile.following = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>