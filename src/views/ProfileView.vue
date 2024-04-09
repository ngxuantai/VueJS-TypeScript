<template>
  <div class="container">
    <div class="infor-container" v-if="user">
      <div class="avatar-container">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
        />
      </div>
      <span>{{ user.displayName }}</span>
      <p>{{ user.email }}</p>
    </div>
    <div class="menu-container" v-if="user">
      <div class="title">
        <h3>General</h3>
        <menu-profile :user="user" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MenuProfile from "@/components/MenuProfile.vue";

import { useUser } from "@/composables/useUser";

export default {
  components: {
    MenuProfile,
  },
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();
    return {
      user,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 0 32px;
  margin-top: 50px;
}
.infor-container {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;
}
.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.infor-container span {
  font-size: 24px;
  font-weight: bold;
  color: blue;
  margin-top: 12px;
}
.infor-container p {
  font-size: 16px;
  color: gray;
  margin-top: 4px;
}
.menu-container {
  margin-top: 32px;
}
</style>
