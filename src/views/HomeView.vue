<template>
  <div v-if="user">
    <h1>{{ user.displayName }}</h1>
  </div>
</template>

<script lang="ts">
import { useUser } from "@/composables/useUser";
import { Options, Vue } from "vue-class-component";
export default {
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();
    return {
      user,
    };
  },
};
</script>
