<template>
  <div class="landing-bg">
    <div class="landing">
      <div class="container">
        <from-auth></from-auth>
        <div class="row">
          <div class="col-lg-6 col-md-12 mx-auto">
            <div class="form shadow p-3 mb-5 rounded">
              <h2 class="text-center my-3 text-white">Register</h2>
              <VeeForm
                v-slot="{ handleSubmit }"
                :validation-schema="schema"
                as="div"
              >
                <form @submit="handleSubmit($event, register)">
                  <div class="form-group">
                    <label for="username" class="text-white">Username</label>
                    <Field
                      type="text"
                      class="form-control bg-input"
                      id="username"
                      name="username"
                      placeholder="Enter username"
                      autocomplete="off"
                    />
                    <ErrorMessage name="username" class="message-error" />
                  </div>
                  <div class="form-group">
                    <label for="password" class="text-white">Password</label>
                    <Field
                      type="password"
                      class="form-control bg-input"
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      autocomplete="off"
                    />
                    <ErrorMessage name="password" class="message-error" />
                  </div>
                  <div class="form-group">
                    <label for="confirmPassword" class="text-white"
                      >Confirm password</label
                    >
                    <Field
                      type="password"
                      class="form-control bg-input"
                      id="confirmation"
                      name="confirmation"
                      placeholder="Enter confirm password"
                      autocomplete="off"
                    />
                    <ErrorMessage name="confirmation" class="message-error" />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-custom btn-lg btn-block text-white"
                  >
                    Sign Up
                  </button>
                  <div class="text-center mt-2 text-white">
                    Do not have an account?
                    <router-link to="/login">Sign In</router-link>
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
  components: {
    FromAuth,
    VeeForm,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      username: yup.string().required().min(5),
      password: yup.string().required().min(8),
      confirmation: yup
        .string()
        .required()
        .min(8)
        .oneOf([yup.ref("password")], "Password's not match"),
    });
    return { schema };
  },
  methods: {
    async register(values) {
      const { success, message } = await this.$store.dispatch("AUTH/register", {
        username: values.username,
        password: values.password,
      });
      if (success) {
        this.$router.push("/dashboard");
      } else {
        this.$swal.fire("", message, "error");
      }
    },
  },
};
</script>

<style></style>
