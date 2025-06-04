// vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: '/Amazon_clone__frontend/',
//   plugins: [react()],
//   build: {
//     chunkSizeWarningLimit: 500, // keep default limit
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ['react', 'react-dom'],
//           firebase: ['firebase'],
//           stripe: ['@stripe/react-stripe-js', '@stripe/stripe-js'],
//           mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
//         },
//       },
//     },
//   },
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: '/Amazon_clone__frontend/',
//   plugins: [react()],
//   build: {
//     // Removed chunkSizeWarningLimit and manualChunks for default behavior
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Amazon_clone__frontend/', // ✅ Must match the GitHub repo name exactly
  plugins: [react()],
});
