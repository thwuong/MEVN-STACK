<template>
  <div class="col-lg-6 col-md-6" v-for="post in allPost" :key="post._id">
    <div class="post">
      <div class="post__body">
        <p class="post__status" :class="[convertClass(post.status)]">
          {{ post.status }}
        </p>
        <h4 class="post__title">{{ post.title }}</h4>
        <span class="post__description">{{ post.description }}</span>
        <div class="post__controls">
          <span class="btn__control btn__link"
            ><a
              :href="post.url"
              target="_blank"
              class="post-url text-decoration-none"
              ><i class="fa-solid fa-play btn__icon"></i></a
          ></span>
          <span
            @click="getPostId(post._id)"
            class="btn__control btn__edit"
            data-toggle="modal"
            data-target="#myModalEdit"
            ><i class="fa-solid fa-pen-to-square btn__icon"></i
          ></span>
          <span @click="deletePost(post._id)" class="btn__control btn__delete"
            ><i class="fa-solid fa-trash btn__icon"></i
          ></span>
        </div>
      </div>
      <div class="post__frame">
        <img :src="post.src" alt="" class="post__img" />
      </div>
    </div>
  </div>
  <div v-if="!isEmptyPost">
    <span class="text-white">{{ message }}</span>
  </div>
  <div
    class="modal fade"
    id="myModalEdit"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    v-if="show"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Post</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <VeeForm
            v-slot="{ handleSubmit }"
            :validation-schema="schema"
            as="div"
          >
            <form
              @submit="handleSubmit($event, editPost)"
              v-for="item in getPost"
              :key="item._id"
            >
              <div class="form-group">
                <label for="title">Title</label>
                <Field
                  name="title"
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Enter title"
                  :model-value="item.title"
                />
                <ErrorMessage name="title" class="message-error" />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <Field
                  name="description"
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="Enter description"
                  :model-value="item.description"
                />
              </div>
              <div class="form-group">
                <label for="src">Src</label>
                <Field
                  name="src"
                  type="text"
                  class="form-control"
                  id="src"
                  placeholder="Enter src of image"
                  :model-value="item.src"
                />
              </div>
              <div class="form-group">
                <label for="url">Url</label>
                <Field
                  name="url"
                  type="text"
                  class="form-control"
                  id="url"
                  placeholder="Enter url"
                  :model-value="item.url"
                />
              </div>
              <div class="form-group w-50">
                <Field
                  class="form-control form-control-md"
                  as="select"
                  name="status"
                >
                  <option :value="item.status" disabled>
                    Status Selected {{ item.status }}
                  </option>
                  <option
                    v-for="itemClass in listClass"
                    :value="converstKey(itemClass)"
                  >
                    {{ converstKey(itemClass) }}
                  </option>
                </Field>
              </div>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-danger mr-2"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-success">Save</button>
              </div>
            </form>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  data() {
    const schema = yup.object({
      title: yup.string().required(),
      description: yup.string(),
      src: yup.string(),
      url: yup.string(),
      status: yup.string(),
    });
    return {
      schema,
      listClass: [
        { LEARNED: "learned" },
        { LEARNING: "learning" },
        { TOLEARN: "tolearn" },
      ],
      show: false,
      message: "empty post list, create new post",
    };
  },
  components: { VeeForm, Field, ErrorMessage },
  computed: {
    allPost() {
      return this.$store.state.POST.posts;
    },
    isEmptyPost() {
      return this.$store.state.POST.posts[0];
    },
    getPost() {
      return this.$store.state.POST.post;
    },
  },
  methods: {
    converstKey(key) {
      return Object.keys(key).toString();
    },
    convertClass(status) {
      return status === "LEARNED"
        ? "learned"
        : status === "LEARNING"
        ? "learning"
        : "tolearn";
    },
    getPostId(id) {
      this.show = !this.show;
      this.$store.dispatch("POST/getPostById", id);
    },
    async editPost(values) {
      values.id = this.getPost[0]._id;
      const { success, message } = await this.$store.dispatch(
        "POST/editPost",
        values
      );
      if (success) {
        this.$swal
          .fire({
            position: "center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1000,
          })
          .then(() => this.$router.go());
      }
    },
    deletePost(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#20B2AA",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            const { message } = this.$store.dispatch("POST/deletePost", id);
            this.$swal.fire(message, "Your file has been deleted.", "success");
          }
        });
    },
  },
};
</script>

<style scoped>
@media (max-width: 575.98px) {
  .post {
    flex-wrap: wrap-reverse;
  }
}
@media (min-width: 768px) and (max-width: 991.98px) {
  .post {
    flex-wrap: wrap-reverse;
  }
}
.post {
  display: flex;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 15px;
}
.post__title {
  font-weight: 800;
}
.post__status {
  font-weight: 600;
}
.post__description {
  color: #9e9a9a;
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.post__body {
  padding: 20px 0 20px 20px;
  width: 100%;
}
.post__frame {
  width: 100%;
  height: 240px;
  padding: 20px;
  overflow: hidden;
}
.post__img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
  transition: all 0.4s;
}
.post__controls {
  display: flex;
  flex-wrap: wrap;

  width: 100%;
}
.btn__control a {
  color: #fff;
}
.btn__control {
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
  color: #fff;
}
.btn__icon {
  transition: all 0.4s;
}
.btn__link {
  background: #03a9f4;
}
.btn__edit {
  background: #f08f20;
}
.btn__delete {
  background: #f34a5e;
}
.btn__control:hover .btn__icon {
  transform: scale(1.4);
}
.post__img:hover {
  transform: translateY(-10px) translateX(5px);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
.tolearn {
  color: #f34a5e;
}
.learned {
  color: #03f44f;
}
.learning {
  color: #f08f20;
}
</style>
