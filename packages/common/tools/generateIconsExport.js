const fs = require('fs/promises');
const { lstatSync, readdirSync, unlinkSync, writeFileSync } = require('fs');
const { pascal } = require('case');
const svgr = require('@svgr/core');

const icons = readdirSync('src/icons');
const queue = [...icons];

const importLines = [];

const promises = [];

while (queue.length) {
    const element = queue.shift();

    if (lstatSync(`src/icons/${element}`).isDirectory()) {
        queue.push(...readdirSync(`src/icons/${element}`).map(e => `${element}/${e}`));
        // eslint-disable-next-line no-continue
        continue;
    }

    const splitted = element.split('/');
    const importName = `Icon${pascal(`${splitted.join('_').replace('.svg', '').replace(/-/g, '_')}`)}`;

    promises.push(
        (async () => {
            const content = await fs.readFile(`src/icons/${element}`, 'utf8');

            let reactCode = await svgr.transform(
                content,
                {
                    icon: false,
                    plugins: ['@svgr/plugin-jsx'],
                },
                { componentName: importName }
            );

            reactCode = reactCode.replace(
                'import * as React from "react";\n',
                'import { SVGProps } from "react";\n\n'
            );
            reactCode = reactCode.replace('props => ', '(props: SVGProps<SVGSVGElement>) => ');
            reactCode = reactCode.replace('const ', 'export const ');
            reactCode = reactCode.replace(`export default ${importName};`, '');

            return fs.writeFile(`src/iconsComponents/${importName}.tsx`, reactCode, 'utf8');
        })()
    );

    importLines.push(`export { ${importName} } from './iconsComponents/${importName}';`);
}

async function main() {
    await Promise.all(promises);

    const disclaimer = '/* THIS FILE IS AUTO-GENERATED, DO NOT MODIFY IT */\n\n';
    const head = '';
    const body = importLines.join('\n');
    const content = `${disclaimer}\n${head}\n${body}\n`;

    try {
        unlinkSync('./src/icons-export.ts');
        // eslint-disable-next-line no-empty
    } catch {}

    writeFileSync('./src/icons-export.ts', content);
}

main().catch(console.error);
