import { defineConfig } from 'vite';
import { hydrogen } from '@shopify/hydrogen/vite';
import { vitePlugin as remix } from '@remix-run/dev';

// Manually replicate what @shopify/mini-oxygen's oxygen() plugin does,
// without importing it (avoids Vite 6 defaultClientConditions dependency).
// These conditions tell Vite/Remix we're building for Cloudflare Workers (Oxygen).
const workerConditions = ['worker', 'workerd', 'browser', 'module', 'main'];

export default defineConfig({
  appType: 'custom',
  plugins: [
    hydrogen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
  resolve: {
    conditions: workerConditions,
  },
  ssr: {
    noExternal: true,
    target: 'webworker',
    resolve: {
      conditions: workerConditions,
    },
    optimizeDeps: {
      include: ['typographic-base'],
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ['cookie', 'react', 'react-dom', 'react-dom/server', 'react-router-dom'],
  },
});
