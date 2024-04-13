<template>
  <div class="menu-item">
    <router-link to="/">
      <div class="item">
        <div class="icon-text">
          <wallet-outlined />
          <p>My wallet</p>
        </div>
        <div class="arrow">
          <right-outlined />
        </div>
      </div>
    </router-link>
    <router-link to="/">
      <div class="item">
        <div class="icon-text">
          <tool-outlined />
          <p>Tools</p>
        </div>
        <div class="arrow">
          <right-outlined />
        </div>
      </div>
    </router-link>
    <router-link to="/">
      <div class="item">
        <div class="icon-text">
          <lock-outlined />
          <p>Privacy</p>
        </div>
        <div class="arrow">
          <right-outlined />
        </div>
      </div>
    </router-link>
    <router-link to="/">
      <div class="item">
        <div class="icon-text">
          <info-circle-outlined />
          <p>About</p>
        </div>
        <div class="arrow">
          <right-outlined />
        </div>
      </div>
    </router-link>
    <router-link to="/logout">
      <div class="item">
        <div class="icon-text" style="color: red">
          <logout-outlined />
          <p>Logout</p>
        </div>
        <div class="arrow">
          <right-outlined />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import {
  RightOutlined,
  WalletOutlined,
  ToolOutlined,
  LockOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    RightOutlined,
    WalletOutlined,
    ToolOutlined,
    LockOutlined,
    InfoCircleOutlined,
    LogoutOutlined,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    console.log(props.user);
    return {};
  },
};
</script>

<style scoped>
.menu-item {
  margin-top: 20px;
  display: grid;
  grid-template-rows: 1fr;
  gap: 20px;
}
.menu-item a,
.menu-item p {
  color: black;
  text-decoration: none;
  margin: auto 0;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}
.item .icon-text {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
</style>
