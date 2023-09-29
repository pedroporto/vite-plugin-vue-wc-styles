import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // esbuild: {
  //   keepNames: true, // Preserve variable names
  // },
  build: {
    minify: false,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, './src/index.ts'),
        'custom-element': path.resolve(__dirname, './src/custom-element.ts'),
      },
      output: [
        {
          format: 'esm',
          entryFileNames: '[name].mjs',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
        },
      ],
      preserveEntrySignatures: 'allow-extension',
    },
  },
});
