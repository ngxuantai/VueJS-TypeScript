import { defineAsyncComponent } from "vue";

export function importComponent(app: any) {
  app.component(
    "auth-layout",
    defineAsyncComponent(() => import("../layouts/auth.vue"))
  );
  app.component(
    "default-layout",
    defineAsyncComponent(() => import("../layouts/default.vue"))
  );
}
