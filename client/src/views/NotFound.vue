<template>
  <div class="container-fuild">
    <div class="not-found">
      <h1 class="not-found__heading">404</h1>
      <h3 class="not-found__title">This Page Not Found</h3>
      <span class="not-found__description">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </span>
      <router-link to="/dashboard" class="not-found__control"
        >Back to home</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.not-found {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.not-found__heading {
  font-size: 72px;
  font-weight: 800;
}
.not-found__title {
  font-size: 48px;
  font-weight: 600;
}
.not-found__description {
  font-weight: 600;
}
.not-found__control {
  margin-top: 10px;
  padding: 12px 24px;
  background: -webkit-linear-gradient(
    rgba(221, 122, 5, 0.8),
    rgba(236, 25, 164, 0.8)
  );

  color: #221e20;
  text-decoration: none;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.4s;
}
.not-found__control:hover {
  color: orange;
}
</style>
