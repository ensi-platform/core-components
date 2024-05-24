const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

function createIndexFileForPackages() {
    let exportsMap = {}; // Используем объект для отслеживания экспортов

    fs.readdirSync(distDir, { withFileTypes: true }).forEach(item => {
        if (item.isDirectory()) {
            const componentName = item.name;
            const esmIndexPath = path.join(distDir, componentName, 'esm', 'index.js');

            if (fs.existsSync(esmIndexPath)) {
                const fileContent = fs.readFileSync(esmIndexPath, 'utf8');

                const exportsMatches = fileContent.match(/export\s+\{[^}]+\}/g);
                if (exportsMatches) {
                    exportsMatches.forEach(match => {
                        // Определяем тип экспорта: default или named
                        switch (true) {
                            case /export\s+\{[^}]+\}/.test(match):
                                const exportBlockMatches = match.match(/export\s+\{([^}]+)\}/);
                                const exportsList = exportBlockMatches[1].split(',');
                                exportsList.forEach(exp => {
                                    const trimmedExp = exp.trim();
                                    const [identifier, alias] = trimmedExp.split(' as ');
                                    let exportName = alias ? alias.trim() : identifier.trim();
                                    exportsMap[`${exportName}`] =
                                        `export { ${exportName} } from './${componentName}/esm/index.js';`;
                                });
                                break;
                            case /export\s+\{[^}]+\}\s+from\s+'([^']+\.js)';/.test(match):
                                const namedExportsMatch = match.match(/export\s+\{([^}]+)\}\s+from\s+'([^']+\.js)';/);
                                const exportsListWithPath = namedExportsMatch[1].split(',');
                                const fromPath = namedExportsMatch[2];
                                exportsListWithPath.forEach(exp => {
                                    const [identifier, alias] = exp.trim().split(' as ');
                                    let exportName = alias || identifier;
                                    exportsMap[`${exportName}`] =
                                        `export { ${exportName} } from './${componentName}/esm/${fromPath}';`;
                                });
                                break;
                            default:
                                console.log(`used default export case for component: ${componentName}`);
                                const exportList = match.match(/\{\s*([^}]+)\s*\}/)[1];
                                exportList.split(',').forEach(exp => {
                                    const trimmedExp = exp.trim();
                                    const [identifier, alias] = trimmedExp.split(' as ');
                                    let exportName = alias ? alias.trim() : identifier.trim();
                                    exportsMap[`${exportName}`] =
                                        `exportsList { ${identifier.trim()} as ${exportName} } from './${componentName}/esm/index.js';`;
                                });
                                break;
                        }
                    });
                }
            } else {
                console.log(`esm/index.js not found for component ${componentName}`);
            }
        }
    });
    // Генерируем итоговые строки экспорта, используя последние определения каждого экспорта
    const exportStatements = Object.values(exportsMap).join('\n');

    if (exportStatements) {
        const indexPath = path.join(distDir, 'index.mjs');
        fs.writeFileSync(indexPath, exportStatements);
        console.log(`Index file created at ${indexPath}`);
    } else {
        console.log(`No components found in ${distDir}`);
    }
}

createIndexFileForPackages();

function createCjsIndexFileForPackages() {
    let exportsMap = {}; // Используем объект для уникального хранения экспортов

    fs.readdirSync(distDir, { withFileTypes: true }).forEach(item => {
        if (item.isDirectory()) {
            const componentName = item.name;
            const capitalizedComponentName = componentName
                .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
                .replace(/^./, letter => letter.toUpperCase());
            const cjsIndexPath = path.join(distDir, componentName, 'cjs', 'index.js');

            if (fs.existsSync(cjsIndexPath)) {
                const fileContent = fs.readFileSync(cjsIndexPath, 'utf8');

                // Обработка прямого module.exports
                const moduleExportMatch = fileContent.match(/module\.exports\s+=\s+([^;]+);/);
                if (moduleExportMatch) {
                    exportsMap[capitalizedComponentName] =
                        `var ${capitalizedComponentName} = require('./${componentName}/cjs/index.js');\nexports.${capitalizedComponentName} = ${capitalizedComponentName};\n`;
                }

                // Обработка exports.default и named exports
                const exportDefaultMatches = fileContent.match(/exports\.default\s+=\s+([^;]+);/g);
                const namedExportsMatches = fileContent.match(/exports\.[^ ]+\s+=\s+[^;]+;/g);
                const defineExportsMatches = fileContent.match(
                    /Object\.defineProperty\(exports, "([^"]+)", {[^}]+}\);/g
                );
                // exports.default
                if (exportDefaultMatches) {
                    exportDefaultMatches.forEach(match => {
                        exportsMap[capitalizedComponentName] =
                            `var ${capitalizedComponentName} = require('./${componentName}/cjs/index.js').default;\nexports.${capitalizedComponentName} = ${capitalizedComponentName};\n`;
                    });
                }

                // Обработка именованных экспортов
                if (namedExportsMatches) {
                    namedExportsMatches.forEach(match => {
                        const [full, exportName, exportValue] = match.match(/exports\.([^ ]+)\s+=\s+(.+);/);
                        exportsMap[exportName] =
                            `var ${exportName} = require('./${componentName}/cjs/index.js').${exportName};\nexports.${exportName} = ${exportName};\n`;
                    });
                }

                // Обработка экспортов через defineProperty
                if (defineExportsMatches) {
                    defineExportsMatches.forEach(match => {
                        const exportName = match.match(/Object\.defineProperty\(exports, "([^"]+)", {[^}]+}\);/)[1];
                        exportsMap[exportName] =
                            `Object.defineProperty(exports, "${exportName}", { enumerable: true, get: function () { return require('./${componentName}/cjs/index.js').${exportName}; } });\n`;
                    });
                }
            } else {
                console.log(`cjs/index.js not found for component ${componentName}`);
            }
        }
    });

    // Собираем все уникальные экспорты в одну строку
    const exportStatements = Object.values(exportsMap).join('');

    // Пишем итоговый файл
    if (exportStatements) {
        const indexPath = path.join(distDir, 'index.cjs');
        const fileContent = `'use strict';\n\n${exportStatements}`;
        fs.writeFileSync(indexPath, fileContent);
        console.log(`index.cjs file created at ${indexPath}`);
    } else {
        console.log('No exports to write in index.cjs');
    }
}

createCjsIndexFileForPackages();
