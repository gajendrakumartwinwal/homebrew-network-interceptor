import mapping from "./mapping";
import axios from "axios";
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
            console.log('Error', e);
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
    console.log('GAJENDRA -> 1', mapping)
    const overrides = await mapping.overrides(interceptedRequest);
    console.log('GAJENDRA -> 2' )
    const responseData = await mapping.responseData(interceptedRequest);
    const [overrides1, responseData1] = await mergeResponse(overrides, responseData);
    console.log('overrides1 -> ', overrides1 )
    console.log('responseData1 -> ', responseData1 )
    if (overrides1) return interceptedRequest.continue(overrides1);
    if (responseData1) {
        return interceptedRequest.respond(responseData1);
    }
    interceptedRequest.continue();
}
