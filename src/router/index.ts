import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
      /* webpackChunkName: "register" */ return import(
        "../views/LoginView.vue"
      );
    },
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      layout: "auth",
    },
    component: () => {
      /* webpackChunkName: "register" */ return import(
        "../views/LogoutView.vue"
      );
    },
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      layout: "default",
    },
    component: () => {
      /* webpackChunkName: "register" */ return import(
        "../views/ProfileView.vue"
      );
    },
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
