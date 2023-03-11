import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/cjs/index.cjs', format: 'cjs' },
      { dir: 'dist/esm', format: 'es', preserveModules: true },
    ],
    plugins: [swc(defineRollupSwcOption())],
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts' },
    plugins: [dts()],
  },
];
