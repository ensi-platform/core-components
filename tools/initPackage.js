const fs = require('fs/promises');
const inquirerAsync = import('inquirer');

// Function to create a package
async function createPackage(packageName) {
    await fs.mkdir(`packages/${packageName}`);

    await fs.mkdir(`packages/${packageName}/src`);

    const packageJson = {
        name: `@greensight/core-components-${packageName}`,
        version: '1.0.0',
        description: `${packageName} component`,
        keywords: [],
        license: 'MIT',
        main: 'index.js',
        module: './esm/index.js',
        publishConfig: {
            access: 'public',
            directory: 'dist',
        },
        peerDependencies: {
            react: '^16.9.0 || ^17.0.1 || ^18.0.0',
            'react-dom': '^16.9.0 || ^17.0.1 || ^18.0.0',
            '@emotion/react': '^11.11.1',
            '@emotion/styled': '11.3.0',
        },
        dependencies: {
            tslib: '^2.4.0',
        },
    };

    const tsConfigJson = {
        include: ['src', '../../typings', `src/${packageName}.stories.tsx`],
        extends: '../../tsconfig.json',
        compilerOptions: {
            outDir: 'dist',
            rootDirs: ['src'],
            baseUrl: '.',
            paths: {
                '@greensight/core-components-*': ['../*/src'],
            },
        },
        references: [],
    };

    await fs.writeFile(`packages/${packageName}/package.json`, JSON.stringify(packageJson, null, 2));
    await fs.writeFile(`packages/${packageName}/tsconfig.json`, JSON.stringify(tsConfigJson, null, 2));

    await fs.writeFile(`packages/${packageName}/README.md`, `# Компонент ${packageName}`);
    await fs.writeFile(`packages/${packageName}/src/index.tsx`, `/// `);
    await fs.writeFile(`packages/${packageName}/src/${packageName}.stories.tsx`, `/// `);
}

function isKebabCase(str) {
    return /^[a-z]+(-[a-z]+)*$/.test(str);
}

async function main() {
    const { default: inquirer } = await inquirerAsync;

    const answers = await inquirer.prompt([
        {
            name: 'packageName',
            message: 'Enter the name of the package to create:',
            validate: input => {
                if (input && isKebabCase(input)) {
                    return true;
                }
                return 'Please enter a valid subfolder name (only a-z, "-" are allowed).';
            },
        },
    ]);

    const { packageName } = answers;
    await createPackage(packageName);
}

main().catch(console.error);
