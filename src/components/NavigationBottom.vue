<template>
  <footer id="footer">
    <div class="container">
      <router-link :to="{ name: 'home', params: {} }">
        <dashboard-outlined />
      </router-link>
      <router-link :to="{ name: 'report', params: {} }">
        <bar-chart-outlined />
      </router-link>
      <router-link :to="{ name: 'budget', params: {} }">
        <pie-chart-outlined />
      </router-link>
      <router-link :to="{ name: 'profile', params: {} }">
        <user-outlined />
      </router-link>
    </div>
    <div class="add-trans">
      <div @click="goToNewTrans">
        <router-link :to="{ name: 'new-transaction', params: {} }">
          <plus-outlined />
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  PieChartOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

export default {
  components: {
    DashboardOutlined,
    BarChartOutlined,
    PieChartOutlined,
    UserOutlined,
    PlusOutlined,
  },
  setup() {
    const router = useRouter();
    const goToNewTrans = () => {
      router.push({ name: "new-transaction", params: {} });
    };
    return {
      goToNewTrans,
    };
  },
};
</script>

<style scoped>
#footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #f8f8f8;
}
.container {
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0 20px;
}
.container a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
}
#footer > .add-trans {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 30px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
}
#footer > .add-trans > div {
  content: "+";
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #1890ff;
  cursor: pointer;
}
#footer a:nth-child(2) {
  margin-right: 10%;
}
#footer a:nth-child(3) {
  margin-left: 10%;
}
</style>
