<template>
  <footer id="footer">
    <div class="container">
      <router-link to="/">
        <dashboard-outlined />
      </router-link>
      <router-link to="/">
        <bar-chart-outlined />
      </router-link>
      <router-link to="/">
        <pie-chart-outlined />
      </router-link>
      <router-link to="/">
        <user-outlined />
      </router-link>
    </div>
  </footer>
</template>

<script lang="ts">
import {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    DashboardOutlined,
    BarChartOutlined,
    PieChartOutlined,
    UserOutlined,
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
}
.container a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
}
#footer ::before{
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 30px;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
  background-color: white;
}
#footer ::after{
  content: "+";
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
