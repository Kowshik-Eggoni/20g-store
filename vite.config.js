import { defineConfig } from 'vite';
import { hydrogen } from '@shopify/hydrogen/vite';
import { vitePlugin as remix } from '@remix-run/dev';

// Manually replicate what @shopify/mini-oxygen's oxygen() plugin does,
// without importing it (avoids Vite 6 defaultClientConditions dependency).
// These conditions tell Vite/Remix we're building for Cloudflare Workers (Oxygen).
const workerConditions = ['worker', 'workerd', 'browser', 'module', 'main'];

// Replicates the key part of oxygen()'s config hook:
// when Remix triggers the SSR build with ssr:true, redirect the entry
// to server.js (the Cloudflare Workers fetch handler). Without this,
// the SSR bundle has no export default { fetch } and Oxygen rejects it.
const oxygenSsrEntry = {
  name: 'oxygen-ssr-entry',
  config(config, env) {
    if (env.isSsrBuild && config.build?.ssr === true) {
      return { build: { ssr: './server' } };
    }
  },
};

export default defineConfig({
  appType: 'custom',
  plugins: [
    oxygenSsrEntry,
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
