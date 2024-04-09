import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
const projectAuth = require("../config/firebase").projectAuth;

const requireAuth = (to: any, from: any, next: any) => {
  const user = projectAuth.currentUser;
  if (!user) {
    next({ name: "login", params: {} });
  }
  next();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "auth",
    },
    component: () => {
      /* webpackChunkName: "register" */ return import(
        "../views/RegisterView.vue"
      );
    },
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "auth",
    },
    component: () => {
      /* webpackChunkName: "login" */ return import("../views/LoginView.vue");
    },
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      layout: "auth",
    },
    component: () => {
      /* webpackChunkName: "logout" */ return import("../views/LogoutView.vue");
    },
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      layout: "default",
    },
    component: () => {
      /* webpackChunkName: "profile" */ return import(
        "../views/ProfileView.vue"
      );
    },
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
