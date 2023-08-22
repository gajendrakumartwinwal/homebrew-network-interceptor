import fs from "fs";
const FILE_PATH = './src/resources/response.json';
let mappingConfig = JSON.parse(fs.readFileSync(FILE_PATH));
let lastUpdatedTime = Date.now();

export function matchUrlPattern(pattern, urlString) {
    const escapedPattern = pattern.replace(/\*/g, '.*');
    const regex = new RegExp(`^${escapedPattern}$`);
    return regex.test(urlString);
}

export function getMappingConfig() {
    const currentTime = new Date();
    const timeDifferenceInMilliseconds = currentTime - lastUpdatedTime;
    const oneMinuteInMilliseconds = 10 * 1000;
    if (timeDifferenceInMilliseconds >= oneMinuteInMilliseconds) {
        mappingConfig = JSON.parse(fs.readFileSync(FILE_PATH));
    }
    return mappingConfig;
}