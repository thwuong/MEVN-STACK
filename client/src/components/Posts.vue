<template>
  <div class="container mt-4">
    <div class="row">
      <post-item></post-item>
    </div>
  </div>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: {
    PostItem,
  },
  created() {
    this.$store.dispatch("POST/getAllPost");
  },
};
</script>

<style lang="scss" scoped></style>
