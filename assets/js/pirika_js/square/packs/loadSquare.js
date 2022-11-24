import { createApp } from 'vue'
import App from '../square.vue'
import { store } from './store'

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(App);
  app.use(store);
  app.mount("#window");

  if (process.env.NODE_ENV !== 'production') {
    window.app = app;
  }
});
