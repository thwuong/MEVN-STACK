<template>
  <div class="dashboard-bg">
    <div class="dashboard">
      <nav-bar></nav-bar>
      <intro></intro>
      <posts></posts>
      <span class="btn btn__create" data-toggle="modal" data-target="#myModal">
        <i class="fa-solid fa-plus btn__icon"></i>
      </span>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="myModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create Post</h5>
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
            <form @submit="handleSubmit($event, createPost)">
              <div class="form-group">
                <label for="title">Title</label>
                <Field
                  name="title"
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Enter title"
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
                />
              </div>
              <div class="form-group w-50">
                <Field
                  class="form-control form-control-md"
                  as="select"
                  name="status"
                >
                  <option value="" disabled>Select Status</option>
                  <option v-for="status in statusList" :value="status">
                    {{ status }}
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
                <button type="submit" class="btn btn-success">Create</button>
              </div>
            </form>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import NavBar from "../components/NavBar.vue";
import Posts from "../components/Posts.vue";
import Intro from "../components/Intro.vue";
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
      statusList: ["TO LEARN", "LEARNING", "LEARNED"],
      schema,
    };
  },
  components: {
    Intro,
    NavBar,
    Posts,
    VeeForm,
    Field,
    ErrorMessage,
  },
  computed: {
    loggedIn() {
      return this.$store.state.AUTH.status.loggedIn;
    },
  },
  methods: {
    async createPost(values, {resetForm}) {
      const { message, success } = await this.$store.dispatch(
        "POST/addPost",
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
          .then(() => {
            this.$store.dispatch("POST/getAllPost");
            $('#myModal').modal('hide');
            resetForm();
          });
      }
    },
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push("/login");
    }
  },
};
</script>

<style></style>
