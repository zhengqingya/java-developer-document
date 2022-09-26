import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);

// 将 store 实例作为插件安装
app.use(store);

app.mount("#app");
