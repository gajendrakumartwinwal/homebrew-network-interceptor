import https from "https";
import axios from "axios";
import logger from "../logger";
import _ from "lodash";
import {getFunctionFromFile} from "../mapping/utils";

const mergeResponse = async (overrides, responseData) => {
    if (responseData && overrides) {
        const {method, url, headers: headerOverrides, postData} = overrides || {};
        const request = {
            method: method,
            url,
            headers: headerOverrides,
            data: postData,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        }
        let status, headers, contentType, body;
        try{
            const response = await axios(request);
            status = response.status;
            headers = response.headers;
            contentType = response.headers['content-type'];
            body = response.data;
        }catch (e){
            if (e.response) {
                status = e.response.status;
                headers = e.response.headers;
                contentType =  headers['content-type'];
                body = e.response.data;
            } else {
                status = 500;
                contentType =  'application/json';
                body = {message: e.message};
            }
            logger('error', e);
        }
        const {status: mockStatus, headers: mockHeaders, contentType: mockContentType, body: mockBody, mapFunctionPath} = responseData;
        let updatedResposeData = {
            status: mockStatus || status,
            headers: typeof headers === 'object' ? _.merge(headers, mockHeaders): headers,
            contentType: mockContentType || contentType,
            body: (typeof body === 'object' || !body) ? JSON.stringify(_.merge(body, mockBody)): body
        }
        try {
            if(mapFunctionPath) updatedResposeData = getFunctionFromFile(mapFunctionPath)(updatedResposeData, _);
        }catch (e) {
            logger('error',  e.message)
            updatedResposeData.body = {
                source: responseData.mapFunctionPath,
                message: e.message
            };
            updatedResposeData.status=500;
        }
        return [undefined, updatedResposeData];
    }
    // we are parsing this as puppetier expects an string only
    if(responseData && responseData.mapFunctionPath) {
        try {
            responseData = getFunctionFromFile(responseData.mapFunctionPath)(responseData, _);
        }catch (e) {
            logger('error',  e.message)
            responseData.body= {
                source: responseData.mapFunctionPath,
                message: e.message
            };
            responseData.status=500;
        }
    }
    const stringifiedOverrides = overrides ? {...overrides, postData: JSON.stringify(overrides.postData)} : overrides
    let stringifiedResponseData = responseData ? {...responseData, body: JSON.stringify(responseData.body)} : responseData
    return [stringifiedOverrides, stringifiedResponseData];
}

export default mergeResponse;