const fs = require('fs');
const path = require('path');

const iconFolder = path.resolve(__dirname, '../assets/icons');
const outputFile = path.resolve(__dirname, 'symbolImageObj2.js');

let fileContent = 'export const symbolLogo = {\n';

fs.readdirSync(iconFolder).forEach(file => {
  if (path.extname(file) === '.png') {
    const key = path.basename(file, '.png');
    if (fileContent.includes(key)) return;
    fileContent += `  "${key}": require('../assets/icons/${file}'),\n`;
  }
});

fileContent += '};';

fs.writeFileSync(outputFile, fileContent);
