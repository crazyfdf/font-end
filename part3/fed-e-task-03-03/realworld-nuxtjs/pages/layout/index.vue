<template>
  <div class='index'>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand"
                   to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link"
                       to="/"
                       exact>Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link"
                         to="/editor">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                         to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
                    <nuxt-link class="nav-link"
                         :to="`/profile/${user.username}`">
                       <img class="user-pic"
                     :src="user.image">
                      {{user.username}}
                      </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                         to="/login">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                         to="/register">Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- /顶部导航栏 -->
    <!-- 子路由 -->
    <nuxt-child />
    <!-- /子路由 -->
    <!-- 底部 -->
    <footer>
      <div class="container">
        <nuxt-link to="/"
                   class="logo-font">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from <nuxt-link to="https://thinkster.io">Thinkster</nuxt-link>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部 -->
  </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
</style>
