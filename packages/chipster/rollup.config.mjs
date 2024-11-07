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
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  external: [
    'react', 
    'react-dom', 
    'classnames',
    'styled-components'
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: [
        '**/*.test.tsx',
        '**/*.test.ts',
        'src/__tests__/**/*',
        'src/playwright/**/*'
      ]
    }),
    postcss({
      plugins: [
        autoprefixer(),
        cssnano()
      ],
      modules: {
        generateScopedName: '[local]_[hash:base64:5]'
      },
      extract: 'styles.css',
      minimize: true,
      sourceMap: true
    }),
    terser()
  ]
} 