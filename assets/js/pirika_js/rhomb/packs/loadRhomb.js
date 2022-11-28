import { createApp } from "vue";
import { store } from "./store";
import App from "../rhomb.vue";

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp(App);
  app.use(store);
  app.mount("#window");

  if (process.env.NODE_ENV !== "production") {
    window.app = app;
  }
});
