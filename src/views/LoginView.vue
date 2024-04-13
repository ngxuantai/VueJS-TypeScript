<template>
  <a-form
    :rules="rules"
    :model="formState"
    style="margin: 0 20px; overflow: hidden"
    @finish="onSubmit"
  >
    <a-form-item label="Email" name="email">
      <a-input v-model:value="formState.email" type="text" autocomplete="off" />
    </a-form-item>
    <a-form-item label="Password" name="password">
      <a-input
        v-model:value="formState.password"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item :wrap-col="{ span: 40 }">
      <a-row justify="center">
        <a-button type="primary" :loading="isPending" html-type="submit">
          {{ isPending ? "Loading" : "Sign in" }}
        </a-button>
      </a-row>
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
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import type { Rule } from "ant-design-vue/es/form";

export default defineComponent({
  setup() {
    const router = useRouter();
    const formState = reactive({
      email: "",
      password: "",
    });
    const { error, isPending, signIn } = useAuth();

    let validateEmail = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("Please input the email");
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

    const rules: Record<string, Rule[]> = {
      email: [
        {
          validator: validateEmail,
          trigger: ["change", "blur"],
        },
      ],
      password: [{ validator: validatePassword, trigger: ["change", "blur"] }],
    };
    const onSubmit = async () => {
      await signIn(formState.email, formState.password);
      formState.email = "";
      formState.password = "";
      if (error !== null) {
        router.push({ name: "profile", params: {} });
      }
    };
    return {
      formState,
      rules,
      error,
      isPending,
      onSubmit,
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
