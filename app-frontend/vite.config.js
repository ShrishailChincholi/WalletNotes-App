import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/exp':{
        target:` http://localhost:6060`,
        changeOrigin:true,

      }
    },
     historyApiFallback: true
  }
})
