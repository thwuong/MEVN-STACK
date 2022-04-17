<template>
  <div>
    <h1 class="text-center text-heading">About</h1>
  </div>
  <div class="container">
    <div class="profile">
      <div class="profile__header">
        <div class="profile__avatar">
          <img
            src="https://avatars.githubusercontent.com/u/89563434?s=400&u=2fd2c24854286cbc6befd0c2414baa14dbb55694&v=4"
            alt=""
            class="profile__src"
          />
        </div>
      </div>
      <div class="profile__content">
        <h4 class="profile__name">thwuong</h4>
        <span class="profile__location">Vietnam</span>
      </div>
      <div class="profile__footer">
        <ul class="profile__socials">
          <li class="profile__social">
            <a href="" class="profile__social__link"
              ><i class="fa-brands fa-github"></i
            ></a>
          </li>
          <li class="profile__social">
            <a href="" class="profile__social__link">2</a>
          </li>
          <li class="profile__social">
            <a href="" class="profile__social__link">3</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.text-heading {
  font-size: 68px;
  font-weight: 600;
}
.profile {
  width: 300px;
  background: burlywood;
  border-radius: 10px;
  overflow: hidden;
}
.profile__header {
  position: relative;
  height: 100px;
  background-color: aqua;
}
.profile__src {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile__avatar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  bottom: calc(-80px / 2);
  border-radius: 50%;
  overflow: hidden;
}
.profile__content {
  margin-top: 50px;
  text-align: center;
}
.profile__name {
  font-weight: 600;
}
.profile__location {
  color: #f5f5f5;
  font-size: 16px;
}
.profile__footer {
}
.profile__socials {
  list-style: none;
  padding-left: 0;
  display: flex;
  justify-content: space-between;
}
.profile__social {
}
.profile__social__link {
}
</style>
