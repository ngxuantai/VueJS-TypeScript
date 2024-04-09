<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
// import { defineComponent } from "vue";

export default {
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => {
        return (route.meta.layout || "default") + "-layout";
      }),
    };
  },
};
</script>
