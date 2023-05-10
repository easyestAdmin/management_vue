/*
 * @Description:
 * @Date: 2023-05-10 10:38:41
 * @Author: didi
 * @LastEditTime: 2023-05-10 11:30:54
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // 设置 `@` 指向 `src` 目录
    },
  },
  server: {
    proxy: {
      "/dev": {
        target: "http://172.16.10.194:3000",
        rewrite: (path) => path.replace(/^\/dev/, ""),
      },
    },
  },
});
