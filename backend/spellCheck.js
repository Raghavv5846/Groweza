// checkCase.js
import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    for (let file of fs.readdirSync(dir)) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
            results.push(filePath);
        }
    }
    return results;
}

const files = walk('.');
const allPaths = files.map(f => f.replace(/^\.\//, ''));

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /from\s+['"](\..+?)['"]|require\(['"](\..+?)['"]\)/g;
    let match;
    while ((match = regex.exec(content))) {
        const importPath = (match[1] || match[2]) + (path.extname(match[1] || match[2]) ? '' : '.js');
        const absPath = path.normalize(path.join(path.dirname(file), importPath));
        const relativePath = path.relative(process.cwd(), absPath).replace(/\\/g, '/');
        const actualFile = allPaths.find(p => p.toLowerCase() === relativePath.toLowerCase());
        if (actualFile && actualFile !== relativePath) {
            console.log(`Case mismatch in ${file}: imports "${relativePath}" but file is "${actualFile}"`);
        }
    }
});
