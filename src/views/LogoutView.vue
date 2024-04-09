<template>
  <h1>log out</h1>
</template>

<script>
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, logOut } = useAuth();
    const router = useRouter();
    async function handleLogout() {
      await logOut();
      if (error !== null) {
        router.push("/login");
      }
    }
    handleLogout();
    return {
      error,
    };
  },
};
</script>
