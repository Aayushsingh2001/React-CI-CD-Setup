import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configs } from 'eslint-plugin-react'
import { configDefaults } from 'vitest/config';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // Add this line if you have a setup file
  },
})
