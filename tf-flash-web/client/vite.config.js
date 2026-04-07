import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://api.tf.marzen.cn",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            if (req.url && req.url.includes("/logs/stream")) {
              proxyReq.setTimeout(0);
            }
          });
        },
      },
      /** Socket.IO（监控日志客户端 io({ path: "/socket.io" })） */
      "/socket.io": {
        target: "https://api.tf.marzen.cn",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
