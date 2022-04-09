<template>
  <div>
    <h1>Dashboard</h1>
    <button class="btn btn-primary" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.AUTH.status.loggedIn;
    },
  },
  methods: {
    logout() {
      const alertLogout = confirm("Bạn có muốn đăng xuất");
      if (alertLogout) {
        this.$store.dispatch("AUTH/logout");
        this.$router.push("/login");
      }
    },
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
