import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true, // 是否自动在浏览器打开
    port: 9999, // 端口号
    host: "0.0.0.0",
    //这里的ip和端口是前端项目的;下面为需要跨域访问后端项目
    proxy: {
      "/api": {
        target: "http://localhost:39999",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
