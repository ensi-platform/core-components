const path = require('path');

const packagesDir = path.resolve(__dirname, '../../packages');

module.exports = {
    name: 'componentsResolver',
    transform(code, id) {
        if (id.endsWith('.ts') || id.endsWith('.tsx')) {
            code = code.replace(/from ['"](@ensi-platform\/core-components-.*?)['"]/g, (match, importPath) => {
                const package = importPath.replace('@ensi-platform/core-components-', '');
                const [packageName, ...paths] = package.split('/');
                if (paths.at(0) === 'src') paths.splice(0, 1);

                const relative = path.relative(path.dirname(id), path.join(packagesDir, packageName));
                const normalPath = path.join(relative, 'src', ...paths).replace(/\\/g, '/');

                return `from '${normalPath}'`;
            });
        }
        return {
            code,
            map: null,
        };
    },
};
