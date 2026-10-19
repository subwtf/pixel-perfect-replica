import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/pixel-perfect-replica/',
  plugins: [tailwindcss(), react(), tsconfigPaths()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssMinify: false,
  },
})
