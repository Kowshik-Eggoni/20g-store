import { defineConfig } from 'vite';
import { hydrogen } from '@shopify/hydrogen/vite';
import { oxygen } from '@shopify/mini-oxygen/vite';
import { vitePlugin as remix } from '@remix-run/dev';

const workerConditions = ['worker', 'workerd', 'browser', 'module', 'main'];

export default defineConfig({
  appType: 'custom',
  plugins: [
    hydrogen(),
    oxygen(),
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
