<template>
  <div class="landing-bg">
    <div class="landing">
      <div class="container">
        <from-auth></from-auth>
        <div class="form shadow p-3 mb-5 rounded">
          <h2 class="text-center my-3 text-white">Login</h2>
          <form @submit.prevent="login" class="mx-4">
            <div class="form-group">
              <label for="input-username" class="text-white">Username</label>
              <input
                type="text"
                class="form-control bg-input"
                id="input-username"
                name="username"
                placeholder="Enter username"
                autocomplete="off"
                v-model="username"
              />
            </div>
            <div class="form-group">
              <label for="input-password" class="text-white">Password</label>
              <input
                type="password"
                class="form-control bg-input"
                id="input-password"
                name="password"
                placeholder="Enter password"
                autocomplete="off"
                v-model="password"
              />
            </div>
            <button
              type="submit"
              class="btn btn-custom btn-lg btn-block text-white"
            >
              Sign In
            </button>
            <div class="text-center mt-2 text-white">
              Do not have an account?
              <router-link to="/register">Sign Up</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FromAuth from "@/components/FormAuth.vue";
export default {
  components: { FromAuth },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("AUTH/login", {
        username: this.username,
        password: this.password,
      });
      this.$router.push("/dashboard");
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.AUTH.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
};
</script>

<style></style>
