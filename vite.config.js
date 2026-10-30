import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Allow the GitHub Codespaces forwarded URL (*.app.github.dev) to reach the dev server.
    allowedHosts: ['.app.github.dev'],
  },
})
