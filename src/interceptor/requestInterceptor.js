import mapping from "./mapping";
import axios from "axios";
import logger from "./logger";
//import {printRequestChange, printResponseChange} from "./mapping/utils";
const _ = require("lodash");

export const mergeResponse = async (overrides, responseData) => {
    if (responseData && overrides) {
        const {method, url, headers: headerOverrides, postData} = overrides || {};
        const request = {
            method: method,
            url,
            headers: headerOverrides,
            data: postData
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
        const {status: mockStatus, headers: mockHeaders, contentType: mockContentType, body: mockBody} = responseData;
        const updatedResposeData = {
            status: mockStatus || status,
            headers: typeof headers === 'object' ? _.merge(headers, mockHeaders): headers,
            contentType: mockContentType || contentType,
            body: (typeof body === 'object' || !body) ? JSON.stringify(_.merge(body, mockBody)): body
        }
        return [undefined, updatedResposeData];
    }
    // we are parsing this as puppetier expects an string only
    const stringifiedOverrides = overrides ? {...overrides, postData: JSON.stringify(overrides.postData)} : overrides
    const stringifiedResponseData = responseData ? {...responseData, body: JSON.stringify(responseData.body)} : responseData
    return [stringifiedOverrides, stringifiedResponseData];
}

export const requestInterceptor = async (interceptedRequest) => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;
    const overrides = await mapping.overrides(interceptedRequest);
    const responseData = await mapping.responseData(interceptedRequest);
    const [overrides1, responseData1] = await mergeResponse(overrides, responseData);
    if(overrides1 || responseData1){
        //printRequestChange(interceptedRequest, overrides1);
        //printResponseChange(interceptedRequest, responseData);
        logger('info', 'overrides -> ', overrides1 )
        logger('info', 'responseData -> ', responseData1 )
    }
    if (overrides1) return interceptedRequest.continue(overrides1);
    if (responseData1) {
        return interceptedRequest.respond(responseData1);
    }
    interceptedRequest.continue();
}
