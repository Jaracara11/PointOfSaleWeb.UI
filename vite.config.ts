import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    https: {
      protocol: 'TLSv1.2',
      key: 'public/key.pem',
      cert: 'public/cert.pem'
    }
  }
});
