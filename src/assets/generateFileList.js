const fs = require('fs');
const result = fs.readdirSync('./src/assets/');
const wavFiles = result.filter((filename) => {
    return filename.endsWith('.wav');
});
fs.writeFileSync('./src/assets/fileList.json', JSON.stringify(wavFiles))
