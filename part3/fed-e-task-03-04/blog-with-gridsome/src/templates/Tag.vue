<template>
  <Layout>
    <!-- Page Header-->
    <header class="masthead"
            style="background-image: url(/src/assets/img/home-bg.jpg')">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1># {{$page.tag.title}}</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Main Content-->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="post-preview"
               v-for="post in $page.tag.posts"
               :key="post.id">
            <g-link :to="'/post/'+post.id">
              <h2 class="post-title">{{post.title}}</h2>
              <!-- <h3 class="post-subtitle">Problems look mighty small from 150 miles up</h3> -->
            </g-link>
            <!-- <p class="post-meta">
              Posted by
              <a href="#!">{{edge.node.created_by.firstname}}{{edge.node.created_by.lastname}}</a>
              on {{edge.node.created_at}}
            </p>
            <p>
              <span v-for="tag in edge.node.tags">
                <a href="">{{tag.title}}</a>&nbsp;
              </span>
            </p> -->
          </div>
          <hr />
          <hr />
          <!-- Pager-->
          <!-- <div class="clearfix"><a class="btn btn-primary float-right"
               href="#!">Older Posts →</a></div> -->
          <!-- <pager :info="$page.posts.pageInfo" /> -->
        </div>
      </div>
    </div>
    <hr />
  </Layout>
</template>
<page-query>
  query($id:ID!){
    tag:strapiTag(id:$id){
      id
      title
      posts{
      id
      title
      }
    }
  }
</page-query>
<script>
export default {
  name: "Tag",
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

<style scoped lang="scss">
</style>