<template>
  <div class="form">
    <h2 class="text-center form-heading">Register</h2>
    <form class="form-content" @submit.prevent="register">
      <div class="form-group-custom mt-5">
        <label for="username" class="form-title">Username</label>
        <input
          type="text"
          class="form-input-custom"
          name="username"
          v-model="username"
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
      <div class="form-group-custom mt-5">
        <label for="repeat-password" class="form-title">Repeat Password</label>
        <input
          type="password"
          class="form-input-custom"
          name="repeat-password"
          v-model="repeatPassword"
          @keyup="handleComformPassword"
          :class="{ 'error-border': errorPw }"
          autocomplete="off"
        />
      </div>
      <p class="error-title" v-if="errorPw">Mật khẩu không khớp</p>
      <div class="form-custom-btn mt-5">
        <button class="btn-custom">Sign Up</button>
      </div>
      <p class="form-control-custom mt-4 text-center">
        I already have an account.
        <router-link to="/login">Sign In</router-link>
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
      repeatPassword: "",
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
      if (this.password !== this.repeatPassword) {
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
