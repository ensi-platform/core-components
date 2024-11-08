const path = require('path');
const react = require('@vitejs/plugin-react');
const ViteRequireContext = require('@originjs/vite-plugin-require-context').default;
const tsconfigPaths = require('vite-tsconfig-paths').default;
const svgr = require('vite-plugin-svgr').default;
const { mergeConfig } = require('vite');

const markdownRawPlugin = require('./utils/markdownLoader');
const componentResolverPlugin = require('./utils/componentsResolver');

const resolver = p => path.resolve(__dirname, p);

const getAbsolutePath = value => {
    return path.dirname(require.resolve(path.join(value, 'package.json')));
};

module.exports = {
    stories: [
        './intro/welcome.stories.mdx',
        './intro/*.stories.mdx',
        '../packages/*/src/*.stories.mdx',
        '../packages/*/src/*.stories.tsx',
    ],

    addons: [
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
                // babelOptions: {},
                // sourceLoaderOptions: null,
                // transcludeMarkdown: true,
            },
        },
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-actions'),
        getAbsolutePath('@storybook/addon-interactions'),
    ],

    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },

    typescript: {
        reactDocgen: 'none',
    },

    features: {
        storyStoreV7: true,
        previewMdx2: true,
        emotionAlias: false,
    },

    async viteFinal(config, { configType }) {
        config.plugins = config.plugins.filter(
            plugin => !(Array.isArray(plugin) && plugin[0]?.name.includes('vite:react'))
        );

        config.plugins.push(componentResolverPlugin);

        config.plugins.push(
            svgr({
                include: '**/*.svg',
                svgrOptions: {
                    exportType: 'default',
                },
            })
        );

        config.plugins.push(
            react({
                exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
                jsxImportSource: '@emotion/react',
                babel: {
                    plugins: ['@emotion/babel-plugin'],
                },
            })
        );

        config.plugins.push(ViteRequireContext());
        config.plugins.push(markdownRawPlugin());

        // const mdx = await import("@mdx-js/rollup");

        // config.plugins.push(mdx.default({ remarkPlugins: [] }));

        config.esbuild = {
            // Fixed: [vite] warning: Top-level "this" will be replaced with undefined since this file is an ECMAScript module
            // https://github.com/vitejs/vite/issues/8644
            logOverride: { 'this-is-undefined-in-esm': 'silent' },
        };

        if (configType !== 'PRODUCTION') {
            config.define = { process: {}, 'process.env': {} };
        }

        config.plugins.push(
            /** @see https://github.com/aleclarson/vite-tsconfig-paths */
            tsconfigPaths({
                // My tsconfig.json isn't simply in viteConfig.root,
                // so I've passed an explicit path to it:
                projects: [path.resolve(__dirname, '../tsconfig.json')],
            })
        );

        return mergeConfig(config, {
            assetsInclude: ['**/*.md'],
            resolve: {
                alias: {
                    storybook: resolver('./'),
                },
            },
        });
    },

    docs: {
        autodocs: true,
    },
};
