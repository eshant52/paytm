import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@auth": resolve(__dirname, "src/auth"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@features": resolve(__dirname, "src/features"),
      "@components": resolve(__dirname, "src/components"),
      "@assets": resolve(__dirname, "src/assets"),
      "@layouts": resolve(__dirname, "src/layouts"),
      "@pages": resolve(__dirname, "src/pages"),
      "@data": resolve(__dirname, "src/data"),
      "@utils": resolve(__dirname, "src/utils"),
    },
  },
});
