<script>
export default {};
</script>

<template>
  <div class="form-auth">
    <router-link to="/login"></router-link>
    <router-link to="/register"></router-link>
    <router-view></router-view>
  </div>
</template>

<style>
@import "@/assets/formauth.css";
</style>
