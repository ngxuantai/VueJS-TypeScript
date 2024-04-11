<template>
  <a-form
    :rules="rules"
    :label-col="{ span: 4, offset: 6 }"
    :wrapper-col="{ span: 6 }"
    style="margin: 0 20px; overflow: hidden"
    @submit="onSubmit"
  >
    <a-form-item has-feedback label="Email" name="email">
      <a-input v-model:value="email" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Password" name="password">
      <a-input v-model:value="password" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item :wrap-col="{ span: 40 }">
      <a-button type="primary" :loading="isPending" html-type="submit">
        {{ isPending ? "Loading" : "Sign in" }}
      </a-button>
    </a-form-item>
  </a-form>
  <div class="text">
    <span>
      I'm a new user.
      <router-link to="/register">Sign up</router-link>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import type { Rule } from "ant-design-vue/es/form";

export default defineComponent({
  setup() {
    const router = useRouter();
    const email = ref<string>("");
    const password = ref<string>("");
    const { error, isPending, signIn } = useAuth();

    let validateEmail = async (_rule: Rule) => {
      if (email.value === "") {
        console.log(email.value);
        return Promise.reject("Please input the password");
      } else {
        const emailRejex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRejex.test(email.value)) {
          return Promise.reject("Invalid email address");
        } else {
          return Promise.resolve();
        }
      }
    };
    let validatePassword = async (_rule: Rule) => {
      if (password.value === "") {
        return Promise.reject("Please input the password");
      } else if (password.value.length < 6) {
        return Promise.reject("Password must be at least 6 characters");
      } else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      email: [
        {
          // required: true,
          validator: validateEmail,
          trigger: ["change", "blur"],
        },
      ],
      password: [{ validator: validatePassword, trigger: ["change", "blur"] }],
    };
    // const handleFinish = () => {
    //   console.log("finish");
    // };
    // const handleValidate = () => {
    //   console.log("validate");
    // };
    const onSubmit = async () => {
      await signIn(email.value, password.value);
      email.value = "";
      password.value = "";
      if (error !== null) {
        router.push({ name: "profile", params: {} });
      }
    };
    return {
      email,
      password,
      rules,
      error,
      isPending,
      onSubmit,
      // handleFinish,
      // handleValidate,
    };
  },
});
</script>

<style scoped>
.text {
  text-align: center;
  margin-top: 20px;
}
</style>
