<template>
  <div class="landing-bg">
    <div class="landing">
      <div class="container">
        <from-auth></from-auth>
        <div class="form shadow p-3 mb-5 rounded">
          <h2 class="text-center my-3 text-white">Register</h2>
          <form @submit.prevent="register">
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
            <div class="form-group">
              <label for="input-password" class="text-white"
                >Conform password</label
              >
              <input
                type="password"
                class="form-control bg-input"
                id="input-password"
                name="password"
                placeholder="Enter conform password"
                autocomplete="off"
                v-model="conformPassword"
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
      conformPassword: "",
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
    handleComformPassword() {
      if (this.password !== this.conformPassword) {
        this.errorPw = true;
      } else {
        this.errorPw = false;
      }
    },
  },
  computed: {
    alertErrorPw() {
      this.errorPw = !this.errorPw;
    },
  },
};
</script>

<style>
.error-title {
  font-size: 13px;
  margin-left: 30px;
  color: #e83e8c;
}
.error-border {
  border: #e83e8c 1px solid;
}
</style>
