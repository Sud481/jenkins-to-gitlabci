import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: Replace with your GitHub repo name
export default defineConfig({
  base: "/jenkins-to-gitlabci/",
  plugins: [react()],
});