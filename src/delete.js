const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'mapping.json');
if (fs.existsSync(FILE_PATH)) {
    console.log('File Exists', FILE_PATH)
} else {
    console.log('File doest Exists', FILE_PATH)
}
