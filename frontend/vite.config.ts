import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    hmr: {
      host: '127.0.0.1',
      port: 5173
    },
    proxy: {
      '/api': {
        target: 'https://todo-app-thoti-api.azurewebsites.net',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    sourcemap: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
});
