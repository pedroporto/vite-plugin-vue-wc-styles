import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, './src/index.ts'),
        'custom-element': path.resolve(__dirname, './src/custom-element.ts'),
      },
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
      },
      preserveEntrySignatures: 'allow-extension',
    },
  },
});