<template>
  <a-form
    :rules="rules"
    :label-col="{ span: 4, offset: 2 }"
    :wrapper-col="{ span: 6 }"
    style="margin: 0 20px; overflow: hidden"
    @submit="onSubmit"
  >
    <a-form-item has-feedback label="Full name" name="fullName">
      <a-input v-model:value="email" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Email" name="email">
      <a-input v-model:value="email" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Password" name="password">
      <a-input v-model:value="password" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Confirm password" name="confirm">
      <a-input v-model:value="password" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item :wrap-col="{ span: 40 }">
      <a-button type="primary" :loading="isPending" html-type="submit">
        {{ isPending ? "Loading" : "Sign up" }}
      </a-button>
    </a-form-item>
  </a-form>
  <div class="text">
    <span>
      Already have an account?
      <router-link to="/login">Sign in</router-link>
    </span>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import type { Rule } from "ant-design-vue/es/form";

export default {
  setup() {
    const router = useRouter();
    const fullName = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const confirm = ref<string>("");
    const { error, isPending, signUp } = useAuth();

    let validateFullName = async (_rule: Rule) => {
      if (fullName.value === "") {
        return Promise.reject("Please input the full name");
      } else {
        return Promise.resolve();
      }
    };
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
    let validateConfirm = async (_rule: Rule) => {
      if (confirm.value === "") {
        return Promise.reject("Please input the confirm password");
      } else if (confirm.value !== password.value) {
        return Promise.reject("Password does not match");
      } else {
        return Promise.resolve();
      }
    };
    const rules: Record<string, Rule[]> = {
      fullName: [{ validator: validateFullName, trigger: ["change", "blur"] }],
      email: [
        {
          // required: true,
          validator: validateEmail,
          trigger: ["change", "blur"],
        },
      ],
      password: [{ validator: validatePassword, trigger: ["change", "blur"] }],
      confirm: [{ validator: validateConfirm, trigger: ["change", "blur"] }],
    };
    const onSubmit = async () => {
      await signUp(fullName.value, email.value, password.value);
      fullName.value = "";
      email.value = "";
      password.value = "";
      if (error !== null) {
        router.push({ name: "proflie", params: {} });
      }
    };

    return {
      rules,
      fullName,
      email,
      password,
      error,
      isPending,
      onSubmit,
    };
  },
};
</script>

<style>
.text {
  display: flex;
  justify-content: center;
}
.text span,
.text a {
  font-size: 1rem;
  text-decoration: none;
}
.text.error {
  color: red;
}
</style>
