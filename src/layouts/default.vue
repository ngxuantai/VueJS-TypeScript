<template>
  <navigation-top />
  <slot />
  <navigation-bottom v-if="meta.isShowFooter" />
</template>

<script lang="ts">
import NavigationTop from "@/components/NavigationTop.vue";
import NavigationBottom from "@/components/NavigationBottom.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  components: {
    NavigationTop,
    NavigationBottom,
  },
  setup() {
    const route = useRoute();
    return {
      meta: computed(() => route.meta),
    };
  },
};
</script>
