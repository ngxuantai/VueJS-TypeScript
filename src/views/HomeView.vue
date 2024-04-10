<template>
  <div v-if="userRef">
    <h1>{{ userRef.displayName }}</h1>
  </div>
</template>

<script lang="ts">
import { useUser } from "@/composables/useUser";
import { Options, Vue } from "vue-class-component";
export default {
  setup() {
    const { getUser } = useUser();
    const { userRef } = getUser();
    return {
      userRef,
    };
  },
};
</script>
