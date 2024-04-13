<template>
  <a-form
    :rules="rules"
    :model="formState"
    :label-col="{ span: 4, offset: 2 }"
    :wrapper-col="{ span: 6 }"
    style="margin: 0 20px; overflow: hidden"
    @finish="onSubmit"
  >
    <a-form-item has-feedback label="Full name" name="fullName">
      <a-input
        v-model:value="formState.fullName"
        type="text"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item has-feedback label="Email" name="email">
      <a-input v-model:value="formState.email" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Password" name="password">
      <a-input
        v-model:value="formState.password"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item has-feedback label="Confirm password" name="confirm">
      <a-input
        v-model:value="formState.confirm"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item :wrap-col="{ span: 40 }">
      <a-row justify="center">
        <a-button type="primary" :loading="isPending" html-type="submit">
          {{ isPending ? "Loading" : "Sign up" }}
        </a-button>
      </a-row>
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
import { ref, reactive } from "vue";
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
    const formState = reactive({
      fullName: "",
      email: "",
      password: "",
      confirm: "",
    });
    const { error, isPending, signUp } = useAuth();

    let validateFullName = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("Please input the full name");
      } else {
        return Promise.resolve();
      }
    };
    let validateEmail = async (_rule: Rule, value: string) => {
      if (value === "") {
        console.log(email.value);
        return Promise.reject("Please input the password");
      } else {
        const emailRejex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRejex.test(value)) {
          return Promise.reject("Invalid email address");
        } else {
          return Promise.resolve();
        }
      }
    };
    let validatePassword = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("Please input the password");
      } else if (value.length < 6) {
        return Promise.reject("Password must be at least 6 characters");
      } else {
        return Promise.resolve();
      }
    };
    let validateConfirm = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("Please input the confirm password");
      } else if (value !== formState.password) {
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
      formState,
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
