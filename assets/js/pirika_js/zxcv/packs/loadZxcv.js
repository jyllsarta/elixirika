import { createApp } from "vue";
import App from "../zxcv.vue";

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp(App);
  app.mount(".mountpoint");

  if (process.env.NODE_ENV !== "production") {
    window.app = app;
  }
});
