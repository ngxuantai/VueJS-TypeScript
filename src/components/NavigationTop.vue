<template>
  <header id="header">
    <div class="container">
      <div class="title">
        <div v-if="meta.leading" class="image-container">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="avatar"
          />
        </div>
        <p>{{ meta.text }}</p>
      </div>
      <div class="options">
        <ul>
          <li>
            <bell-outlined />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { BellOutlined } from "@ant-design/icons-vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    BellOutlined,
  },
  setup() {
    const route = useRoute();
    const isHome = computed(() => route.path === "/");
    return {
      meta: computed(() => route.meta),
    };
  },
};
</script>

<style scoped>
#header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f8f8f8;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
}
.title {
  display: flex;
  align-items: center;
}
.image-container {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
}
.image-container img {
  width: 100%;
}
.title p {
  font-weight: bold;
  color: black;
  margin: 16px 0 16px 8px;
}
.options ul {
  display: flex;
  list-style: none;
  margin: 16px 0;
}
</style>
