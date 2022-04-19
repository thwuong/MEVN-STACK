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
              :class="{ active: activeNav }"
              >About</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto d-flex align-items-center">
          <li class="nav-item active mx-4">
            <span class="text-white"
              >Wellcome <i class="active">{{ user }}</i></span
            >
          </li>
          <li class="nav-item active">
            <span class="btn btn-custom logout-control" @click="logout"
              ><i class="fa-solid fa-arrow-right-from-bracket"></i> Sign
              out</span
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    activeNav: Boolean,
  },
  data() {
    return {
      user: {},
      istoggle: false,
    };
  },
  methods: {
    logout() {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "you want to sign out!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "No",
          confirmButtonText: "Yes, i want you to sign out!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch("AUTH/logout");
            this.$router.push("/login");
          }
        });
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
.logout-control:hover {
  color: orange;
}
.about-link:hover {
  color: #221e20;
}
.active {
  color: orange;
}
</style>
