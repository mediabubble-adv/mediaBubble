/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/packages/shared', '<rootDir>/apps/web-eg/components', '<rootDir>/apps/web-eg/lib'],
  testMatch: ['**/*.(test|spec).(ts|tsx|js|cjs)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@mediabubble/shared$': '<rootDir>/packages/shared/src/index.ts',
    '^@mediabubble/design-system$': '<rootDir>/packages/design-system/src/index.ts',
    '^@/(.*)$': '<rootDir>/apps/web-eg/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          module: 'commonjs',
          baseUrl: '.',
          paths: {
            '@/*': ['apps/web-eg/*'],
            '@mediabubble/shared': ['packages/shared/src/index.ts'],
            '@mediabubble/design-system': ['packages/design-system/src/index.ts'],
          },
        },
      },
    ],
  },
}
