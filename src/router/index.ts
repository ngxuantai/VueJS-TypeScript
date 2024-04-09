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
    meta: {
      layout: "default",
      text: "122222",
      leading: true,
      isShowFooter: true,
    },
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
      text: "Profile",
      leading: false,
      isShowFooter: true,
    },
    component: () => {
      /* webpackChunkName: "profile" */ return import(
        "../views/ProfileView.vue"
      );
    },
    beforeEnter: requireAuth,
  },
  {
    path: "/report",
    name: "report",
    meta: {
      layout: "default",
      text: "Report",
      leading: false,
      isShowFooter: true,
    },
    component: () => {
      /* webpackChunkName: "report" */ return import("../views/ReportView.vue");
    },
    beforeEnter: requireAuth,
  },
  {
    path: "/budget",
    name: "budget",
    meta: {
      layout: "default",
      text: "Budget",
      leading: false,
      isShowFooter: true,
    },
    component: () => {
      /* webpackChunkName: "budget" */ return import("../views/BudgetView.vue");
    },
    beforeEnter: requireAuth,
  },
  {
    path: "/new-transaction",
    name: "new-transaction",
    meta: {
      layout: "default",
      text: "New Transaction",
      leading: false,
      isShowFooter: false,
    },
    component: () => {
      /* webpackChunkName: "new-transaction" */ return import(
        "../views/NewTransationView.vue"
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
