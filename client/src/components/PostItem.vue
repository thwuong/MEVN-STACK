<template>
  <div class="col-lg-4 col-md-6" v-for="post in allPost" :key="post._id">
    <div class="post">
      <div class="post-frame">
        <img :src="post.src" alt="" class="post-img" />
      </div>
      <div class="post-body">
        <h4 class="post-title">{{ post.title }}</h4>
        <span class="post-description">{{ post.description }}</span>
        <p class="post-status" :class="[convertClass(post.status)]">
          {{ post.status }}
        </p>

        <div class="post-controls">
          <span class="btn btn-primary btn-sm btn-block"
            ><a
              :href="post.url"
              target="_blank"
              class="post-url text-decoration-none"
              >{{ post.url }}</a
            ></span
          >
        </div>
        <span
          @click="getPostId(post._id)"
          class="btn btn-edit mt-2"
          data-toggle="modal"
          data-target="#myModalEdit"
          ><i class="fa-solid fa-pen-to-square"></i
        ></span>
        <span @click="deletePost(post._id)" class="btn btn-delete mt-2 ml-2"
          ><i class="fa-solid fa-trash"></i
        ></span>
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
                    Select Status {{ item.status }}
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
      console.log(message);
      if (success) {
        this.$swal
          .fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
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
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // const { message } = this.allPost.filter((post) => post._id === id);
            const { message } = this.$store.dispatch("POST/deletePost", id);
            this.$swal
              .fire(message, "Your file has been deleted.", "success")
              .then(() => {
                this.$router.go();
              });
          }
        });

      // const check = confirm(
      //   `Ban co muon xoa post co name ${postName[0].title}`
      // );
      // if (check) this.$store.dispatch("POST/deletePost", id);
    },
  },
};
</script>

<style scoped>
.post {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 10px;
}
.post-frame {
  max-width: 100%;
  height: 200px;
  border-radius: 20px;
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
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}
.btn-delete {
  background: rgba(229, 70, 70, 1);
  color: #fff;
}
.btn-edit {
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
.post-status {
  font-weight: 600;
}
.tolearn {
  color: #f02828;
}
.learned {
  color: #4cdf5d;
}
.learning {
  color: #f08f20;
}
</style>
