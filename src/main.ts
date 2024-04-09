import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { importComponent } from "./utils/import";

const app = createApp(App);
importComponent(app);
app.use(store);
app.use(router);
app.mount("#app");
