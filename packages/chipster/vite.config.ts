import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.join(__dirname, 'src/playwright'),
  server: {
    port: 3000,
    strictPort: false,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    sourcemap: true
  }
})