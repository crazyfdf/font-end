<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <error-component :error="error"></error-component>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input type="text"
                       v-model="articles.title"
                       class="form-control form-control-lg"
                       placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       v-model="articles.description"
                       class="form-control"
                       placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control"
                          v-model="articles.body"
                          rows="8"
                          placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       v-model="tags"
                       class="form-control"
                       placeholder="Enter tags, Each tag is comma-delimited">
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary"
                      type="submit">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import errorComponent from "../../components/error-component.vue";
export default {
  components: { errorComponent },
  name: "editor",
  middleware: "authenticated",
  data() {
    return {
      tags: "",
      error: {},
      articles: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.articles.tagList = this.tags.split(/[,]|[，]/);
        await this.$uct.api("articles/create", this.articles);
        this.$router.push("/");
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