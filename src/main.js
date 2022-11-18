import { createApp } from "vue";
import store from "@/store";
import App from "./App.vue";
import router from "@/router/router";
import "../node_modules/nprogress/nprogress.css";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import $ from "jquery";
// import "bootstrap/dist/js/bootstrap.js";

import "aos/dist/aos.css";
import "vue2-animate/dist/vue2-animate.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";

createApp(App)
  .use(router)
  .use(store)
  .use($)
  .use(VueToast)
  .use(Vue3DraggableResizable)
  .mount("#app");
