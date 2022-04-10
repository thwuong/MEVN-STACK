<template>
  <div class="col-lg-4 col-md-4" v-for="post in allPosts">
    <!-- <div class="card">
      <img class="card-img-top" :src="post.src" :alt="post.title" />
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">
          {{ post.description }}
        </p>
        <p class="card-control">
          <a :href="post.url" class="card-control">Link : {{ post.url }}</a>
        </p>
        <a href="#" class="btn btn-primary">Delete</a>
      </div>
    </div> -->
    <div class="post">
      <div class="post-frame">
        <img :src="post.src" alt="" class="post-img" />
      </div>
      <div class="post-body">
        <h3 class="post-title">HTML CSS</h3>
        <span class="post-description"
          >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
          nostrum?</span
        >
        <p class="post-status">status</p>

        <div class="post-controls">
          <span class="btn btn-custom"
            ><a href="#" class="post-url text-decoration-none"
              >Link den dau</a
            ></span
          >
          <span class="btn btn-edit">Edit</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    allPosts() {
      return this.$store.state.POST.posts;
    },
  },
};
</script>

<style scoped>
.post {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 10px 0;
  text-align: center;
}
.post-frame {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid rgba(201, 134, 57, 0.8);
  margin: 0 auto;
  margin-top: 10px;
  overflow: hidden;
}
.post-frame:hover .post-img {
  transform: scale(1.1);
}
.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s;
}
.post-title {
  font-weight: 600;
  color: #fff;
  margin-top: 10px;
}
.post-description {
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}
.post-controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-delete {
  background: rgba(229, 70, 70, 1);
  color: #fff;
}
.btn-edit {
  margin-left: 10px;
  background: rgba(215, 210, 71, 1);
  color: #fff;
}
.post-url {
  color: #fff;
  transition: all 0.3s;
}
.btn-custom:hover .post-url {
  color: #221e20;
}
</style>
