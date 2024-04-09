<template>
  <slot />
  <navigation-bottom />
</template>

<script lang="ts">
import NavigationBottom from "@/components/NavigationBottom.vue";

export default {
  components: {
    NavigationBottom,
  },
};
</script>
