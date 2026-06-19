/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      displayName: 'shared',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/packages/shared/**/*.(test|spec).(ts|tsx|js|cjs)'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      modulePathIgnorePatterns: [
        '\\.next',
        '\\.nx',
        'dist',
      ],
      moduleNameMapper: {
        '^@mediabubble/shared$': '<rootDir>/packages/shared/src/index.ts',
        '^@mediabubble/shared/client$': '<rootDir>/packages/shared/src/client.ts',
        '^@mediabubble/shared/server$': '<rootDir>/packages/shared/src/server.ts',
        '^@mediabubble/shared/ui/marketing-kicker$': '<rootDir>/packages/shared/src/ui/marketing-kicker.ts',
        '^@mediabubble/design-system$': '<rootDir>/packages/design-system/src/index.ts',
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
              resolveJsonModule: true,
              paths: {
                '@mediabubble/shared': ['packages/shared/src/index.ts'],
                '@mediabubble/shared/client': ['packages/shared/src/client.ts'],
                '@mediabubble/shared/server': ['packages/shared/src/server.ts'],
                '@mediabubble/shared/ui/marketing-kicker': ['packages/shared/src/ui/marketing-kicker.ts'],
                '@mediabubble/design-system': ['packages/design-system/src/index.ts'],
              },
            },
          },
        ],
      },
    },
    {
      displayName: 'web-eg',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/apps/web-eg/components/**/*.(test|spec).(ts|tsx|js|cjs)',
        '<rootDir>/apps/web-eg/lib/**/*.(test|spec).(ts|tsx|js|cjs)'
      ],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      modulePathIgnorePatterns: [
        '\\.next',
        '\\.nx',
        'dist',
      ],
      moduleNameMapper: {
        '^@mediabubble/shared$': '<rootDir>/packages/shared/src/index.ts',
        '^@mediabubble/shared/client$': '<rootDir>/packages/shared/src/client.ts',
        '^@mediabubble/shared/server$': '<rootDir>/packages/shared/src/server.ts',
        '^@mediabubble/shared/ui/marketing-kicker$': '<rootDir>/packages/shared/src/ui/marketing-kicker.ts',
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
              resolveJsonModule: true,
              paths: {
                '@/*': ['apps/web-eg/*'],
                '@mediabubble/shared': ['packages/shared/src/index.ts'],
                '@mediabubble/shared/client': ['packages/shared/src/client.ts'],
                '@mediabubble/shared/server': ['packages/shared/src/server.ts'],
                '@mediabubble/shared/ui/marketing-kicker': ['packages/shared/src/ui/marketing-kicker.ts'],
                '@mediabubble/design-system': ['packages/design-system/src/index.ts'],
              },
            },
          },
        ],
      },
    },
    {
      displayName: 'web-ae',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/apps/web-ae/components/**/*.(test|spec).(ts|tsx|js|cjs)',
        '<rootDir>/apps/web-ae/lib/**/*.(test|spec).(ts|tsx|js|cjs)'
      ],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      modulePathIgnorePatterns: [
        '\\.next',
        '\\.nx',
        'dist',
      ],
      moduleNameMapper: {
        '^@mediabubble/shared$': '<rootDir>/packages/shared/src/index.ts',
        '^@mediabubble/shared/client$': '<rootDir>/packages/shared/src/client.ts',
        '^@mediabubble/shared/server$': '<rootDir>/packages/shared/src/server.ts',
        '^@mediabubble/shared/ui/marketing-kicker$': '<rootDir>/packages/shared/src/ui/marketing-kicker.ts',
        '^@mediabubble/design-system$': '<rootDir>/packages/design-system/src/index.ts',
        '^@/(.*)$': '<rootDir>/apps/web-ae/$1',
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
              resolveJsonModule: true,
              paths: {
                '@/*': ['apps/web-ae/*'],
                '@mediabubble/shared': ['packages/shared/src/index.ts'],
                '@mediabubble/shared/client': ['packages/shared/src/client.ts'],
                '@mediabubble/shared/server': ['packages/shared/src/server.ts'],
                '@mediabubble/shared/ui/marketing-kicker': ['packages/shared/src/ui/marketing-kicker.ts'],
                '@mediabubble/design-system': ['packages/design-system/src/index.ts'],
              },
            },
          },
        ],
      },
    },
    {
      displayName: 'launcher',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/apps/launcher/lib/**/*.(test|spec).(ts|tsx|js|cjs)'
      ],
      modulePathIgnorePatterns: [
        '\\.next',
        '\\.nx',
        'dist',
      ],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/apps/launcher/$1',
      },
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            tsconfig: {
              esModuleInterop: true,
              module: 'commonjs',
              baseUrl: '.',
              resolveJsonModule: true,
              paths: {
                '@/*': ['apps/launcher/*'],
              },
            },
          },
        ],
      },
    }
  ]
}
