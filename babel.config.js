module.exports = {
    plugins: ['@babel/plugin-transform-modules-commonjs', '@babel/plugin-proposal-class-properties'],
    presets: [
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                modules: false,
            },
        ],
        [
            '@babel/preset-typescript',
            {
                isTSX: true,
                allExtensions: true,
            },
        ],
    ],
};
