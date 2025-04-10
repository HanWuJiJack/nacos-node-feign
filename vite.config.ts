import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['node:*']
    }
  },
  test: {
    environment: 'node'
  },
  plugins: [splitVendorChunkPlugin()]
})