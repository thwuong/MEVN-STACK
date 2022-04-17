<template>
  <div class="landing-bg">
    <div class="landing">
      <div class="container">
        <from-auth></from-auth>
        <div class="row">
          <div class="col-lg-6 col-md-12 mx-auto">
            <div class="form shadow p-3 mb-5 rounded">
              <h2 class="text-center my-3 text-white">Login</h2>
              <VeeForm
                v-slot="{ handleSubmit }"
                :validation-schema="schema"
                as="div"
              >
                <form
                  @submit="handleSubmit($event, login)"
                  class="mx-4"
                  :validation-schema="schema"
                >
                  <div class="form-group">
                    <label for="input-username" class="text-white"
                      >Username</label
                    >
                    <Field
                      type="text"
                      class="form-control bg-input"
                      id="input-username"
                      name="username"
                      placeholder="Enter username"
                      autocomplete="off"
                    />
                    <ErrorMessage name="username" class="message-error" />
                  </div>
                  <div class="form-group">
                    <label for="input-password" class="text-white"
                      >Password</label
                    >
                    <Field
                      type="password"
                      class="form-control bg-input"
                      id="input-password"
                      name="password"
                      placeholder="Enter password"
                      autocomplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-custom btn-lg btn-block text-white"
                  >
                    Sign In
                  </button>
                  <div class="text-center mt-2 text-white">
                    Do not have an account?
                    <router-link to="/register">Sign Up</router-link>
                  </div>
                </form>
              </VeeForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FromAuth from "@/components/FormAuth.vue";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  components: { FromAuth, VeeForm, Field, ErrorMessage },
  data() {
    const schema = yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
    });
    return {
      schema,
    };
  },
  methods: {
    async login(values) {
      const { message, success } = await this.$store.dispatch("AUTH/login", {
        username: values.username,
        password: values.password,
      });
      if (!success) {
        this.$swal.fire("", message, "error");
      } else {
        this.$router.push("/dashboard");
      }
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.AUTH.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
};
</script>

<style></style>
