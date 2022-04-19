<template>
  <div class="intro">
    <img src="../assets/intro.png" alt="introduction" class="intro__img" />
    <h1 class="intro__heading">Learning Now!</h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.intro {
  position: relative;
}
.intro__img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
.intro__heading {
  font-size: 72px;
  font-weight: 600;
  text-shadow: 0 0 3px #fff;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
