import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { importComponent } from "./utils/import";
const projectAuth = require("./config/firebase").projectAuth;
import { onAuthStateChanged } from "firebase/auth";

let app: any;
onAuthStateChanged(projectAuth, () => {
  if (!app) {
    app = createApp(App);
    importComponent(app);
    app.use(store);
    app.use(router);
    app.mount("#app");
  }
});
