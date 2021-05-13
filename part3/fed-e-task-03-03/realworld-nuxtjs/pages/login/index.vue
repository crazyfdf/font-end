<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center"> {{isLogin?'Sign in':'Sign up'}}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin"
                       to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else
                       to="/login">Have an account?</nuxt-link>
          </p>

          <error-component :error="error"></error-component>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin"
                      class="form-group">
              <input class="form-control form-control-lg"
                     type="text"
                     v-model="users.username"
                     placeholder="Your Name"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="text"
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
              {{isLogin?'Sign in':'Sign up'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponent from "../../components/error-component.vue";
export default {
  components: { ErrorComponent },
  middleware: "notAuthenticated",
  name: "login",
  data() {
    return {
      users: {
        email: "",
        username: "",
        password: "",
      },
      error: {}, // 错误信息
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    async onSubmit() {
      try {
        let url = this.isLogin ? "users/login" : "users/register";
        const { data } = await this.$uct.api(url, {
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
  },
};
</script>

<style scoped lang="scss">
</style>