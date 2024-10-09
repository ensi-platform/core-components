const { readFile } = require('fs/promises');

module.exports = function mdImportPlugin() {
    return {
        name: 'md-import',

        async transform(code, id) {
            if (id.endsWith('.md')) {
                // Read the content of the Markdown file
                const content = await readFile(id, 'utf8');

                // Create a new code snippet with a const declaration
                const importCode = `export default ${JSON.stringify(content)};\n`;

                // Return the new code snippet
                return {
                    code: importCode,
                    map: null, // Set the source map to null for simplicity
                };
            }

            return null;
        },
    };
};
