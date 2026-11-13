import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is easy to switch for different hosts:
//   (default)  './'                         relative — works at a domain root or opened locally
//   BASE_PATH=/             npm run build   absolute root (https://melisa.example/)
//   BASE_PATH=/melisa-portfolio/ npm run build   GitHub Pages project site
export default defineConfig({
  base: process.env.BASE_PATH || './',
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
