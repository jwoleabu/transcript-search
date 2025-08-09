import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import {resolve} from 'path';

// https://vite.dev/config/
export default defineConfig({
  build:{
    target:"esnext",
    rollupOptions:{
      input:{
        popup: "./popup/index.html",
      },
      output:{
        entryFileNames: "assets/[name].js"
      }
    }
  },
  plugins: [react()],
})
