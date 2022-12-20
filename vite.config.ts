import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    host: '0.0.0.0',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8844/',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
    //   }
    // }
  },

})
