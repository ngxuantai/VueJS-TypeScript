<template>
  <div class="container">
    <form @submit.prevent="onSubmit" class="form-container">
      <label for="fullName" class="label-item">
        <span>Full Name</span>
        <input type="text" v-model="fullName" />
      </label>
      <label for="email" class="label-item">
        <span>Email Address</span>
        <input type="email" placeholder="example@gmail.com" v-model="email" />
      </label>
      <label for="password" class="label-item">
        <span>Password</span>
        <input type="password" v-model="password" />
      </label>
      <div class="text error" v-if="error">
        <span>
          {{ error }}
        </span>
      </div>
      <button
        :style="{ backgroundColor: isPending ? '#ccc' : '#007bff' }"
        type="submit"
        :disabled="isPending"
      >
        {{ isPending ? "Loading..." : "Sign up" }}
      </button>
    </form>
    <div class="text">
      <span>
        Already have an account?
        <router-link to="/login">Sign in</router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const fullName = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const { error, isPending, signUp } = useAuth();
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
.container {
  /* width: 100%; */
  /* height: 100vh; */
}
.form-container {
  padding: 20px;
}
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.label-item {
  /* margin-bottom: 1rem; */
  width: 100%;
  display: flex;
  flex-direction: column;
}
.label-item span {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.label-item input {
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 0.8rem;
}
.form-container button {
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 0.8rem;
  color: #fff;
  cursor: pointer;
}
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
