import wildcardExternal from '@oat-sa/rollup-plugin-wildcard-external';
import json from '@rollup/plugin-json';
import svgr from '@svgr/rollup';
import { createRequire } from 'module';
import path from 'path';
import copy from 'rollup-plugin-copy';
import multiInput from 'rollup-plugin-multi-input';
import typescript from 'rollup-plugin-ts';
import ts from 'typescript';
import { babel } from '@rollup/plugin-babel';

import {
    coreComponentsResolver,
    coreComponentsRootPackageResolver,
    packagesTypingResolver,
} from './tools/rollup/core-components-resolver.mjs';
import coreComponentsTypingsResolver from './tools/rollup/core-components-typings-resolver.mjs';
import createPackageJson from './tools/rollup/create-package-json.mjs';

const require = createRequire(import.meta.url);

const { ScriptTarget } = ts;

const currentPackageDir = process.cwd();

const currentPkg = path.join(currentPackageDir, 'package.json');

const pkg = require(currentPkg);

const prefix = '@greensight/core-components-';
const currentComponentName = pkg.name.replace(prefix, '');

const babelPlugin = babel({
    babelrc: false,
    presets: ['@babel/preset-react'],
    exclude: ['node_modules/**'],
    babelHelpers: 'runtime',
    plugins: ['@loadable/babel-plugin'],
});

const baseConfig = {
    cache: false,
    input: ['src/**/*.{ts,tsx}', '!src/**/*.{test,stories}.{ts,tsx}', '!src/**/*.mdx', '!src/**/*.d.ts'],
    plugins: [
        wildcardExternal([`${prefix}*/**`]),
        svgr({
            exportType: 'default',
        }),
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
};

const multiInputPlugin = multiInput.default();

const assetsCopyPlugin = dest =>
    copy({
        flatten: false,
        targets: [{ src: ['src/**/*.{png,svg,jpg,jpeg}', '!**/__image_snapshots__/**'], dest }],
    });

const sourceCopyPlugin = copy({
    flatten: false,
    targets: [
        {
            src: [
                'src/**/*.{ts,tsx,json,js,jsx}',
                '!**/{__image_snapshots__,__snapshots__,docs}/**',
                '!src/**/*.test.{ts,tsx}',
            ],
            dest: 'dist/src',
        },
    ],
});

/**
 * Сборка ES5 с commonjs модулями.
 */
const es5 = {
    ...baseConfig,
    output: [
        {
            esModule: true,
            dir: 'dist',
            format: 'cjs',
            interop: 'compat',
            dynamicImportInCjs: false,
            plugins: [packagesTypingResolver()],
        },
    ],
    plugins: [
        ...baseConfig.plugins,
        multiInputPlugin,
        typescript({
            tsconfig: resolvedConfig => ({
                ...resolvedConfig,
                tsBuildInfoFile: 'tsconfig.tsbuildinfo',
            }),
        }),
        // babelPlugin,
        json(),
        assetsCopyPlugin('dist'),
        copy({ targets: [{ src: ['package.json'], dest: 'dist' }] }),
        sourceCopyPlugin,
    ],
};

/**
 * Сборка ES2020 с esm модулями.
 */
const modern = {
    ...baseConfig,
    output: [
        {
            dir: 'dist/modern',
            format: 'esm',
            generatedCode: 'es2015',
            plugins: [coreComponentsResolver({ importFrom: 'modern' }), packagesTypingResolver()],
        },
    ],
    plugins: [
        ...baseConfig.plugins,
        multiInputPlugin,
        typescript({
            outDir: 'dist/modern',
            tsconfig: resolvedConfig => ({
                ...resolvedConfig,
                target: ScriptTarget.ES2020,
                tsBuildInfoFile: 'tsconfig.tsbuildinfo',
            }),
        }),
        // babelPlugin,
        json(),
        assetsCopyPlugin('dist/modern'),
    ],
};

/**
 * Сборка ES5 с esm модулями.
 */
const esm = {
    ...baseConfig,
    output: [
        {
            dir: 'dist/esm',
            format: 'esm',
            plugins: [coreComponentsResolver({ importFrom: 'esm' }), packagesTypingResolver()],
        },
    ],
    plugins: [
        ...baseConfig.plugins,
        multiInputPlugin,
        typescript({
            outDir: 'dist/esm',
            tsconfig: resolvedConfig => ({
                ...resolvedConfig,
                tsBuildInfoFile: 'tsconfig.tsbuildinfo',
            }),
        }),
        // babelPlugin,
        json(),
        assetsCopyPlugin('dist/esm'),
    ],
};

const rootDir = `../../dist/${currentComponentName}`;

/**
 * Сборка рут-пакета
 */
const root = {
    input: ['dist/**/*.js'],
    external: baseConfig.external,
    plugins: [
        ...baseConfig.plugins,
        multiInput.default({
            relative: 'dist',
        }),
        copy({
            flatten: false,
            targets: [
                { src: ['dist/**/*', '!**/*.js', '!dist/src/**'], dest: rootDir },
                {
                    src: 'package.json',
                    dest: `../../dist/${currentComponentName}`,
                    transform: () => createPackageJson('./esm/index.js'),
                },
            ],
        }),
        coreComponentsRootPackageResolver({ currentPackageDir }),
    ],
    output: [
        {
            dir: rootDir,
            plugins: [coreComponentsTypingsResolver({ rootDir })],
        },
    ],
};

const configs = (process.env.BUILD_MODERN_ONLY === 'true' ? [modern, root] : [es5, modern, esm, root]).filter(Boolean);

export default configs;
