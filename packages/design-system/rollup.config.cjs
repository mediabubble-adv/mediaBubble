const { withNx } = require('@nx/rollup/with-nx')

module.exports = withNx(
  {
    main: './src/index.ts',
    outputPath: './dist',
    tsConfig: './tsconfig.lib.json',
    compiler: 'babel',
    format: ['esm', 'cjs'],
    assets: [{ input: '.', output: '.', glob: 'README.md' }],
  },
  {
    input: {
      index: 'packages/design-system/src/index.ts',
      'tailwind-preset': 'packages/design-system/src/tailwind-preset.ts',
    },
  },
)
