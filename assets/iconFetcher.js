const fs = require('fs');
const path = require('path');

const iconFolder = path.resolve(__dirname, 'icons');
const outputFile = path.resolve(__dirname, 'symbolImageObj2.js');

let fileContent = 'const symbolLogo = {\n';

fs.readdirSync(iconFolder).forEach(file => {
  if (path.extname(file) === '.png') {
    const key = path.basename(file, '.png');
    if (fileContent.includes(key)) return;
    fileContent += `  "${key}": require('./icons/${file}'),\n`;
  }
});

fileContent += '};';

fs.writeFileSync(outputFile, fileContent);
