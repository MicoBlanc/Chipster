import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    }
  ],
  external: [
    'react', 
    'react-dom', 
    'classnames'
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist'
    }),
    postcss({
      modules: {
        generateScopedName: 'chipster__[local]__[hash:base64:5]'
      },
      inject: true,
      extract: false,
      autoModules: true,
      minimize: true,
      plugins: [
        autoprefixer(),
        cssnano()
      ]
    }),
    terser()
  ]
} 