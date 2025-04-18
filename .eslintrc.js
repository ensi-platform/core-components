module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: [
        'airbnb',
        'prettier',
        'plugin:mdx/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:storybook/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts'],
            },
        },
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/consistent-type-imports': [1, { fixStyle: 'separate-type-imports' }],
        'import/no-duplicates': ['error', { 'prefer-inline': true }],
        'import/no-cycle': 0,
        'react/react-in-jsx-scope': 0,
        'react/no-unknown-property': [
            'error',
            {
                ignore: ['css'],
            },
        ],
        camelcase: 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-props-no-spreading': 0,
        'react/function-component-definition': 0,
        'import/no-unresolved': [
            2,
            {
                ignore: ['@'],
            },
        ],
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [2],
        'react/no-unescaped-entities': 1,
        'import/extensions': 0,
        'react/destructuring-assignment': 1,
        'react/require-default-props': 0,
        'import/no-extraneous-dependencies': 1,
        'no-param-reassign': [
            2,
            {
                props: false,
            },
        ],
        'react/button-has-type': 1,
        'react/prop-types': 0,
        'no-nested-ternary': 1,
        'react/no-array-index-key': 1,
        'jsx-a11y/anchor-is-valid': 0,
        'no-console': [
            1,
            {
                allow: ['warn', 'error', 'info'],
            },
        ],
        'consistent-return': 0,
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': [1],
        'jsx-a11y/label-has-associated-control': 0,
        'jsx-a11y/no-static-element-interactions': [
            2,
            {
                handlers: ['onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
            },
        ],
        'jsx-a11y/click-events-have-key-events': 0,
        'import/no-named-as-default': 0,
        'import/prefer-default-export': 0,
    },
    overrides: [
        {
            files: ['*.mdx'],
            extends: ['plugin:mdx/overrides'],
        },
        {
            files: ['*.stories.tsx'],
            rules: {
                'react-hooks/rules-of-hooks': 'off',
            },
        },
    ],
    globals: {
        JSX: true,
    },
};
