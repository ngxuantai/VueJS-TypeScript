import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { importComponent } from "./utils/import";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Upload,
  DatePicker,
} from "ant-design-vue";
import "../node_modules/ant-design-vue/dist/reset.css";
const projectAuth = require("./config/firebase").projectAuth;
import { onAuthStateChanged } from "firebase/auth";

let app: any;
onAuthStateChanged(projectAuth, () => {
  if (!app) {
    app = createApp(App);
    importComponent(app);
    app.use(store);
    app.use(router);
    app.use(Form);
    app.use(Input);
    app.use(InputNumber);
    app.use(Button);
    app.use(Row);
    app.use(Col);
    app.use(Upload);
    app.use(DatePicker);
    app.mount("#app");
  }
});
