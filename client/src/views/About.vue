<template>
  <div class="about-bg">
    <div class="about">
      <nav-bar activeNav="true"></nav-bar>
      <h1 class="text-center text-heading title-custom">About us</h1>
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6" v-for="user in users">
            <div class="profile">
              <div class="profile__header">
                <div class="profile__avatar">
                  <img
                    :src="user.avatar_url"
                    :alt="user.name"
                    class="profile__src"
                  />
                </div>
              </div>
              <div class="profile__content">
                <h4 class="profile__name">{{ user.login }}</h4>
                <span class="profile__location">{{ user.location }}</span>
                <div class="profile__details">
                  <div class="profile__item">
                    <span class="profile__title">Follows</span>
                    <p class="profile__quantity">{{ user.followers }}</p>
                  </div>
                  <div class="profile__item">
                    <span class="profile__title">Repositories</span>
                    <p class="profile__quantity">{{ user.public_repos }}</p>
                  </div>
                </div>
              </div>
              <div class="profile__footer">
                <div class="profile__socials">
                  <div class="profile__social">
                    <a
                      :href="user.html_url"
                      target="_blank"
                      class="profile__social__link"
                      ><i class="fa-brands fa-github profile__social_icon"></i>
                      Github</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  components: { NavBar },
  data() {
    return {
      users: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.AUTH.status.loggedIn;
    },
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }
    fetch("https://api.github.com/users/thwuong")
      .then((response) => response.json())
      .then((data) => this.users.push(data));
    fetch("https://api.github.com/users/PVThien21")
      .then((response) => response.json())
      .then((data) => this.users.push(data));
  },
};
</script>

<style scoped>
.about-bg {
  background: #221e20;
}
.about {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.text-heading {
  font-size: 68px;
  font-weight: 600;
}
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 10px;
}
.profile__avatar {
  margin: 20px;
  width: 125px;
  display: block;
  border-radius: 50%;
  transition: all 0.4s;
  overflow: hidden;
}
.profile__src {
  width: 100%;
  display: block;
  object-fit: cover;
}
.profile__avatar:hover {
  transform: scale(1.2);
}
.profile__content {
  text-align: center;
}
.profile__name {
  font-weight: 800;
}
.profile__details {
  display: flex;
  justify-content: center;
}
.profile__item {
  margin-left: 15px;
}
.profile__title {
  font-weight: 600;
}
.profile__quantity,
.profile__location {
  color: #9e9a9a;
}
.profile__socials {
  margin-top: 10px;
  padding: 0;
  padding-bottom: 20px;
  list-style: none;
  display: flex;
  justify-content: center;
}
.profile__social {
  /* margin-right: 20px; */
  margin: 15px;
  padding: 12px 28px;
  border-radius: 8px;
  transition: all 1s linear;
  background: linear-gradient(
    120.37deg,
    rgba(221, 122, 5, 0.8) 0%,
    rgba(236, 25, 164, 0.8) 100%
  );
}
.profile__social__link {
  text-decoration: none;
  color: #fff;
  transition: all 0.4s;
}
.profile__social_icon {
  margin-right: 5px;
}
.profile__social:hover .profile__social__link {
  color: orange;
}
</style>
