const fs = require('fs/promises');
const inquirerAsync = import('inquirer');
const path = require('path');

const prefix = '@ensi-platform/core-components-';

const isKebabCase = str => /^[a-z]+(-[a-z]+)*$/.test(str);

const ucfirst = str => str.slice(0, 1).toUpperCase() + str.slice(1);

async function getPeerDependencies() {
    const packageJsonPath = path.join(__dirname, '../package.json');
    const packageJsonData = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonData);

    return {
        react: '^16.9.0 || ^17.0.1 || ^18.0.0',
        'react-dom': '^16.9.0 || ^17.0.1 || ^18.0.0',
        '@emotion/react': packageJson.dependencies['@emotion/react'],
        '@emotion/styled': packageJson.dependencies['@emotion/styled'],
    };
}

async function getRootDependencies(deps) {
    const resultDeps = {};

    const packageJsonPath = path.join(__dirname, '../package.json');
    const packageJsonData = await fs.readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonData);

    for (const dep of deps) {
        resultDeps[dep] = packageJson.dependencies.tslib;
    }

    return resultDeps;
}

async function getPackageDependencies(packageNames) {
    const result = {};

    for (const packageName of packageNames) {
        const packageJsonPath = path.join(__dirname, '../packages', packageName, 'package.json');

        const packageJsonData = await fs.readFile(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageJsonData);

        result[packageJson.name] = `^${packageJson.version}`;
    }

    return result;
}

// Function to create a package
async function createPackage(packageName, deps) {
    await fs.mkdir(`packages/${packageName}`);

    await fs.mkdir(`packages/${packageName}/src`);

    const packageJson = {
        name: `${prefix}${packageName}`,
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
        peerDependencies: await getPeerDependencies(),
        dependencies: {
            ...(await getRootDependencies(['tslib'])),
            ...(await getPackageDependencies(deps)),
        },
    };

    const tsConfigJson = {
        include: ['src', '../../typings', `src/${ucfirst(packageName)}.stories.tsx`],
        extends: '../../tsconfig.json',
        compilerOptions: {
            outDir: 'dist',
            rootDirs: ['src'],
            baseUrl: '.',
            paths: {
                [`${prefix}*`]: ['../*/src'],
            },
        },
        references: deps.map(dep => ({ path: `../${dep}` })),
    };

    const rootTsConfigJson = JSON.parse(await fs.readFile('./tsconfig.json'));
    rootTsConfigJson.compilerOptions.paths[`${prefix}${packageName}/*`] = [`packages/${packageName}/src/*`];

    await fs.writeFile('./tsconfig.json', JSON.stringify(rootTsConfigJson, null, 2));
    await fs.writeFile(`packages/${packageName}/package.json`, JSON.stringify(packageJson, null, 2));
    await fs.writeFile(`packages/${packageName}/tsconfig.json`, JSON.stringify(tsConfigJson, null, 2));
    await fs.writeFile(`packages/${packageName}/README.md`, `# Компонент ${packageName}`);
    await fs.writeFile(`packages/${packageName}/src/index.tsx`, `/// `);
    await fs.writeFile(`packages/${packageName}/src/${ucfirst(packageName)}.stories.tsx`, `/// `);

    await fs.mkdir(`packages/${packageName}/src/components`);
    await fs.mkdir(`packages/${packageName}/src/scripts`);
    await fs.mkdir(`packages/${packageName}/src/themes`);

    await fs.copyFile(path.join(__dirname, '../LICENSE.md'), `packages/${packageName}/LICENSE.md`);
}

async function main() {
    const { default: inquirer } = await inquirerAsync;

    const packageNames = await fs.readdir('./packages');
    packageNames.sort((a, b) => a - b);

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
        {
            name: 'deps',
            type: 'checkbox',
            message: `Select the dep packages`,
            choices: packageNames,
            pageSize: 15,
        },
    ]);

    const { packageName, deps } = answers;
    await createPackage(packageName, deps);

    console.log('Successfully created!');
}

main().catch(console.error);
