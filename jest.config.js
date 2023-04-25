module.exports = {
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/*.d.ts',
        '!.next/**',
        '!.yarn/**',
        '!.storybook/**',
        '!.husky/**',
        '!public/**',
        '!**/themes/**',
        '!src/scripts/**',
        '!**/stories/**',
        '!**/*.stories.{tsx,mdx}',
        '!**/types/**/*.{ts,js}',
        '!**/enums/**/*.{ts,js}',
        '!**/{constants,types,typings,context,synthetic-events}.{ts,js,tsx,jsx}',
        '!.eslintrc.js',
        '!.prettierrc.js',
        '!jest.config.js',
        '!next.config.js',
        '!coverage/**',
    ],
    coverageDirectory: 'coverage',
    moduleNameMapper: {
        // Handle CSS imports (with CSS modules)
        // https://jestjs.io/docs/webpack#mocking-css-modules
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

        // Handle CSS imports (without CSS modules)
        '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

        // Handle image imports
        // https://jestjs.io/docs/webpack#handling-static-assets
        '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': `<rootDir>/__mocks__/fileMock.js`,

        // Absolute Imports and Module Path Aliases
        '@components/(.*)$': '<rootDir>/src/components/$1',
        '@containers/(.*)$': '<rootDir>/src/containers/$1',
        '@scripts/(.*)$': '<rootDir>/src/scripts/$1',
        '@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '@icons/(.*)$': '<rootDir>/src/icons/$1',
        '@standart/(.*)$': '<rootDir>/src/standart/$1',
        '@customTypes/(.*)$': '<rootDir>/src/customTypes/$1',
        '@utility/(.*)$': '<rootDir>/src/utility/$1',
        '@context/(.*)$': '<rootDir>/src/context/$1',
        '@api/(.*)$': '<rootDir>/src/api/$1',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    transform: {
        // Use babel-jest to transpile tests with the next/babel preset
        // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
        '^.+\\.(js|jsx|ts|tsx)$': [
            'babel-jest',
            {
                presets: [
                    'next/babel',
                    [
                        '@babel/preset-react',
                        {
                            runtime: 'automatic',
                            importSource: '@emotion/core',
                        },
                    ],
                ],
                plugins: ['@emotion/babel-plugin'],
            },
            'jest-preview/transforms/file',
        ],
    },
    transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx}'],
};
