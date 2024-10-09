import pkg from './package.json' assert {type: "json"};

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js', // Denna fil bör finnas
  output: [
    {
      file: pkg.main, // 'dist/index.cjs.js'
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module, // 'dist/index.es.js'
      format: 'es',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.unpkg, // 'dist/index.umd.js'
      format: 'umd',
      name: pkg.name.replace(/[^a-zA-Z0-9]/g, ''),
      exports: 'named',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    }
  ],
  plugins: [
    postcss({
      extensions: ['.css'],
    }),
    resolve({
      extensions: ['.js', '.jsx'],
      dedupe: ['prop-types']
    }),
    commonjs(),
    image(),
    terser(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react']
    }),
  ],
  external: Object.keys(pkg.peerDependencies || {})
};