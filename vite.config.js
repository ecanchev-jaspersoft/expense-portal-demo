import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/expense-portal-demo/',
    server: {
        historyApiFallback: true, // Ensures all routes are redirected to index.html
    },
});
