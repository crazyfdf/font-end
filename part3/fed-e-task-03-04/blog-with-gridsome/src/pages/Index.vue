<template>
  <Layout>
    <!-- Page Header-->
    <header class="masthead"
            :style="`background-image: url(${GRIDSOME_API_URL}${general.cover?general.cover.url:''})`">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>{{general.title}}</h1>
              <span class="subheading">{{general.subtitle}}</span>
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
               v-for="edge in $page.posts.edges"
               :key="edge.node.id">
            <g-link :to="'/post/'+edge.node.id">
              <h2 class="post-title">{{edge.node.title}}</h2>
              <!-- <h3 class="post-subtitle">Problems look mighty small from 150 miles up</h3> -->
            </g-link>
            <p class="post-meta">
              Posted by
              <a href="#!">{{edge.node.created_by.firstname}}{{edge.node.created_by.lastname}}</a>
              on {{edge.node.created_at}}
            </p>
            <p>
              <span v-for="tag in edge.node.tags">
                <g-link :to="'/tag/'+tag.id">{{tag.title}}</g-link>&nbsp;
              </span>

            </p>
          </div>
          <hr />
          <hr />
          <!-- Pager-->
          <!-- <div class="clearfix"><a class="btn btn-primary float-right"
               href="#!">Older Posts →</a></div> -->
          <pager :info="$page.posts.pageInfo" />
        </div>
      </div>
    </div>
    <hr />
  </Layout>
</template>
<page-query>
  query($page:Int){
    posts:allStrapiPost(perPage:2,page:$page)@paginate{
      pageInfo {
        totalPages
        currentPage
      }
      edges{
        node{
          id
          title
          created_at
          created_by{
            id
            firstname
            lastname
          }
          tags{
            id
            title
          }
        }
      }
    }
    general:allStrapiGeneral{
      edges{
        node{
          id
          title
          subtitle
          cover{
            url
          }
        }
      }
    }
  }
    
</page-query>
<script>
import { Pager } from "gridsome";
export default {
  components: {
    Pager,
  },
  computed: {
    general() {
      return this.$page.general.edges[0].node;
    },
  },
  mounted() {
    console.log(this.GRIDSOME_API_URL);
  },
  metaInfo: {
    title: "Hello, world!",
  },
};
</script>

<style>
</style>
