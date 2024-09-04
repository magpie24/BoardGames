import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/konczeztym/', // Replace with your repository name
  plugins: [react()],
});
