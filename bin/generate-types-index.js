const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname, '..');
const distPath = path.join(rootPath, 'dist');
const typesDir = path.join(distPath, 'types');
const outputPath = path.join(typesDir, 'index.d.ts');

async function generateTypesIndex() {
    await fs.promises.mkdir(typesDir, { recursive: true });

    const dirs = await fs.promises.readdir(distPath, { withFileTypes: true });
    const imports = [];

    for (const dir of dirs) {
        if (dir.isDirectory()) {
            const componentPath = path.join(distPath, dir.name, 'esm', 'index.d.ts');
            if (fs.existsSync(componentPath)) {
                const fileContent = await fs.promises.readFile(componentPath, 'utf8');
                const defaultExportMatch = fileContent.match(/export\s+\{\s*(\w+)\s+as\s+default[^}]*\};/);

                if (defaultExportMatch) {
                    const defaultExportName = defaultExportMatch[1];
                    imports.push(`export { default as ${defaultExportName} } from '../${dir.name}/esm/index';`);
                } else {
                    imports.push(`export * from '../${dir.name}/esm/index';`);
                }
            }
        }
    }

    const content = imports.join('\n') + '\n';
    await fs.promises.writeFile(outputPath, content);
}

generateTypesIndex().catch(console.error);
