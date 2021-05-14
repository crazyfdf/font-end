<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <error-component :error="error"></error-component>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control"
                       type="text"
                       v-model="users.image"
                       placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="text"
                       v-model="users.username"
                       required
                       placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg"
                          rows="8"
                          v-model="users.bio"
                          placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="email"
                       v-model="users.email"
                       placeholder="Email"
                       required>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg"
                       type="password"
                       v-model="users.password"
                       placeholder="Password"
                       minlength="8"
                       required>
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <button class="btn btn-outline-danger"
                  @click="logout">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import errorComponent from "../../components/error-component.vue";
export default {
  components: { errorComponent },
  name: "settings",
  middleware: "authenticated",
  data() {
    return {
      error: {},
      users: {
        username: "",
        image: "",
        bio: "",
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    this.users = this.user;
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await this.$uct.api("users/update", {
          user: this.users,
        });
        console.log(data.user);
        this.$uct.vuex("user", data.user);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.error = error.response.data.errors;
      }
    },
    logout() {
      try {
        this.$uct.vuex("user", null);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>