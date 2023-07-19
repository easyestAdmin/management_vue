import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import "./index.css";
import "element-plus/dist/index.css";
createApp(App).use(ElementPlus).use(router).mount("#app");
