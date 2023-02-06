import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import vue3dLoader from "vue-3d-loader";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App).use(vue3dLoader).use(ElementPlus).mount("#app");

// createApp(App).mount('#app')
