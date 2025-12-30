import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/types/index.ts',
    'src/types/order.ts',
    'src/types/product.ts',
    'src/specs/index.ts',
    'src/specs/t-shirt-spec.ts',
    'src/specs/t-shirt-artifacts.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  target: 'node20',
  outDir: 'dist',
});

