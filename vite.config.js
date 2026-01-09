import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ဒီ plugin က အဓိကပါ

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 ကို Vite မှာ တိုက်ရိုက် သုံးခြင်း
  ],
})