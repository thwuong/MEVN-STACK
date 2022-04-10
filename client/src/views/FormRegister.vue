<template>
  <div class="landing-bg">
    <div class="landing">
      <div class="container">
        <from-auth></from-auth>
        <div class="form shadow p-3 mb-5 rounded">
          <h2 class="text-center my-3 text-white">Register</h2>
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="username" class="text-white">Username</label>
              <input
                type="text"
                class="form-control bg-input"
                id="username"
                name="username"
                placeholder="Enter username"
                autocomplete="off"
                v-model="username"
              />
            </div>
            <div class="form-group">
              <label for="password" class="text-white">Password</label>
              <input
                type="password"
                class="form-control bg-input"
                id="password"
                name="password"
                placeholder="Enter password"
                autocomplete="off"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <label for="confirm-password" class="text-white"
                >Confirm password</label
              >
              <input
                type="password"
                class="form-control bg-input"
                id="confirm-password"
                name="confirm-password"
                placeholder="Enter confirm password"
                autocomplete="off"
                v-model="confirmPassword"
              />
            </div>
            <button
              type="submit"
              class="btn btn-custom btn-lg btn-block text-white"
            >
              Sign Up
            </button>
            <div class="text-center mt-2 text-white">
              Do not have an account?
              <router-link to="/login">Sign In</router-link>
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
  components: {
    FromAuth,
  },
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      errorPw: false,
    };
  },
  methods: {
    register() {
      this.$store.dispatch("AUTH/register", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
