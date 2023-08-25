import fs from "fs";
const path = require('path');

const FILE_PATH = path.join(__dirname, 'public/response.json');
let mappingConfig = JSON.parse(fs.readFileSync(FILE_PATH));
let lastUpdatedTime = Date.now();

export function matchUrlPattern(pattern, urlString) {
    const escapedPattern = pattern.replace(/\*/g, '.*');
    const regex = new RegExp(`^${escapedPattern}$`);
    return regex.test(urlString);
}

export function getMappingConfig() {
    const currentTime = Date.now();
    const timeDifferenceInMilliseconds = currentTime - lastUpdatedTime;
    const oneMinuteInMilliseconds = 10 * 1000;

    if (timeDifferenceInMilliseconds >= oneMinuteInMilliseconds) {
        const fileContent = fs.readFileSync(FILE_PATH);
        mappingConfig = JSON.parse(fileContent);
    }
    return mappingConfig;
}