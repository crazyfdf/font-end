<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="http://i.imgur.com/Qr71crq.jpg"
                 class="user-img" />
            <h4>Eric Simons</h4>
            <p>
              Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow Eric Simons
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
                <nuxt-link class="nav-link active"
                           to="">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           to="">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <nuxt-link to=""><img src="http://i.imgur.com/Qr71crq.jpg" /></nuxt-link>
              <div class="info">
                <nuxt-link to=""
                           class="author">Eric Simons</nuxt-link>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <nuxt-link to=""
                       class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <nuxt-link to=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></nuxt-link>
              <div class="info">
                <nuxt-link to=""
                           class="author">Albert Pai</nuxt-link>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <nuxt-link to=""
                       class="preview-link">
              <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </nuxt-link>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  name: "profile",
};
</script>

<style scoped lang="scss">
</style>