<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <router-link
        to="/dashboard"
        class="text-center font-weight-bold title-custom"
        >MEVN</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link
              to="/about"
              class="ml-4 text-decoration-none about-link"
              >About</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto d-flex align-items-center">
          <li class="nav-item active mr-4">
            <span class="text-white">Wellcome {{ user }}</span>
          </li>
          <li class="nav-item active">
            <span class="btn btn-custom logout-control" @click="logout"
              ><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</span
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      istoggle: false,
    };
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
  computed: {
    istoggled() {
      this.istoggle = !this.istoggle;
    },
  },
  async created() {
    const res = await this.$store.dispatch("AUTH/getUser");
    this.user = res.user.username;
  },
};
</script>

<style scoped>
.title-custom {
  font-size: 32px;
}
.logout-control,
.about-link {
  color: #fff;
  transition: all 0.3s;
}
.logout-control:hover,
.about-link:hover {
  color: #221e20;
}
</style>
