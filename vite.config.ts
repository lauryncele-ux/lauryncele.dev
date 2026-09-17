import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

declare const process: { env: Record<string, string | undefined> }

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served from the apex domain (lauryncodes.com) via GitHub Pages.
  base: process.env.VITE_BASE || '/',
})
