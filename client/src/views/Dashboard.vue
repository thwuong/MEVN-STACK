<template>
  <div class="dashboard-bg">
    <div class="dashboard">
      <nav-bar></nav-bar>
      <posts></posts>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Posts from "../components/Posts.vue";
export default {
  components: {
    NavBar,
    Posts,
  },
  computed: {
    loggedIn() {
      return this.$store.state.AUTH.status.loggedIn;
    },
  },
  methods: {},
  created() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
