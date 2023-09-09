import fs from "fs";
import logger from "../logger";

const path = require('path');

const FILE_PATH = process.env.NETWORK_INTERCEPTOR_MAPPING || path.join(__dirname, '..', 'mocking.json');
let mappingConfig;
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

    if (!mappingConfig || (timeDifferenceInMilliseconds >= oneMinuteInMilliseconds)) {
        const fileContent = fs.readFileSync(FILE_PATH);
        try {
            mappingConfig = JSON.parse(fileContent);
        } catch (e) {
            logger('error', 'Error occured while parsing json file', e);
        }
    }
    return mappingConfig;
}

export async function generateMappingJSON() {
    const data = [
        {
            "url": "https://dummyjson.com/products/1",
            "request": {
                "mappedUrl": null,
                "mapFunctionPath": null,
                "method": "GET",
                "postData": {
                    "test": "23"
                },
                "headers": {
                    "Authorization": "TOKEN"
                },
                "enable": false
            },
            "response": {
                "status": 200,
                "mapFunctionPath": null,
                "contentType": "application/json",
                "headers": {
                    "Authorization": "TOKEN"
                },
                "body": {
                    "environment": "value"
                },
                "enable": true
            }
        }
    ];

    try {
        // Check if the file exists
        if (!fs.existsSync(FILE_PATH)) {
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync(FILE_PATH, jsonData, 'utf8');
            logger('info', 'JSON file has been created successfully at:', FILE_PATH);
        } else {
            logger('error', 'JSON already exists at:', FILE_PATH);
        }
    } catch (err) {
        logger('error', 'Error: Make sure you have added mocking file path into the env variables \n' +
            'using command\n' +
            'export NETWORK_INTERCEPTOR_MAPPING=<json file path name>.json\n', err);
    }
}

export function getFunctionFromFile(filePath) {
    const jsonData = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8');
    const firstIndex = jsonData.indexOf("{");
    const lastIndex = jsonData.lastIndexOf("}");
    const subString = jsonData.substring(firstIndex + 1, lastIndex);
    let mapFunction = new Function('arg', '_', subString);
    return mapFunction;
}

export function printRequestChange(interceptedRequest, overrides1) {
    console.log("############################# REQUEST MODIFICATIONS #############################");
    const urlDifferences = ''//deepDiff.diff(interceptedRequest.url(), overrides1.url);
    console.log("Url modifications:");
    logger('table', urlDifferences);

    const headersDifferences = ''//deepDiff.diff(interceptedRequest.headers(), overrides1.headers);
    console.log("Headers modifications:");
    logger('table', headersDifferences);

    const methodDifferences = ''//deepDiff.diff(interceptedRequest.method(), overrides1.method);
    console.log("Method modifications:");
    logger('table', methodDifferences);

    const postDataDifferences = ''//deepDiff.diff(interceptedRequest.postData(), overrides1.method);
    console.log("PostData modifications:");
    logger('table', postDataDifferences);

    console.log("#################################################################################");
}

export function printResponseChange() {
    console.log("############################# REQUEST MODIFICATIONS #############################");
    const urlDifferences = ''//deepDiff.diff(interceptedRequest.url(), overrides1.url);
    console.log("Url modifications:");
    logger('table', urlDifferences);

    const headersDifferences = ''//deepDiff.diff(interceptedRequest.headers(), overrides1.headers);
    console.log("Headers modifications:");
    logger('table', headersDifferences);

    const methodDifferences = ''//deepDiff.diff(interceptedRequest.method(), overrides1.method);
    console.log("Method modifications:");
    logger('table', methodDifferences);

    const postDataDifferences = ''//deepDiff.diff(interceptedRequest.postData(), overrides1.method);
    console.log("PostData modifications:");
    logger('table', postDataDifferences);

    console.log("#################################################################################");
}