<template>
  <div class="form">
    <h2 class="text-center form-heading">Login</h2>
    <form class="form-content" @submit.prevent="login">
      <div class="form-group-custom mt-5">
        <label for="username" class="form-title">Username</label>
        <input
          type="text"
          class="form-input-custom"
          name="username"
          v-model="username"
          autocomplete="off"
        />
      </div>
      <div class="form-group-custom mt-5">
        <label for="password" class="form-title">Password</label>
        <input
          type="password"
          class="form-input-custom"
          name="password"
          v-model="password"
          autocomplete="off"
        />
      </div>
      <div class="form-custom-btn mt-5">
        <button class="btn-custom">Sign In</button>
      </div>
      <p class="form-control-custom mt-4 text-center">
        Do not have an account?
        <router-link to="/register">Sign Up</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
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
