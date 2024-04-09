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
  setup(props) {
    console.log(props.user);
    return {};
  },
};
</script>
