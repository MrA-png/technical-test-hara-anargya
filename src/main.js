import { createApp } from "vue";
import router from "./router";
import "../src/assets/css/index.css";
import App from "./App.vue";
import { Icon } from "@iconify/vue";

const app = createApp(App);
app.use(router);
app.component("Icon", Icon);
app.mount("#app");