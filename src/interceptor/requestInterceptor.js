import mapping from "./mapping";
import axios from "axios";
const _ = require("lodash");

export const mergeResponse = async (overrides, responseData) => {
    if (responseData && overrides) {
        const {method, url, headers, postData} = overrides || {};
        const request = {
            method: method,
            url,
            headers,
            data: postData
        }
        let response = {};
        try{
            response = await axios(request);
        }catch (e){
            var errorStatus, errorHeaders, errorContentType, errorData;
            if (e.response) {
                errorStatus = e.response.status;
                errorHeaders = e.response.headers;
                errorContentType =  'application/json';
                errorData = {message: e.response.data};
            } else {
                errorStatus = 500;
                errorContentType =  'application/json';
                errorData = {message: e.message};
            }
            response = {
                status: errorStatus,
                contentType: errorContentType,
                data: errorData,
                headers: errorHeaders,
            }
            console.log('Error', e);
        }
        const {status, headers: responseHeader, contentType, body} = responseData;
        const updatedResposeData = {
            status: status || response.status,
            headers: _.merge(response.headers, responseHeader, ),
            contentType: contentType || response.contentType,
            body: JSON.stringify(_.merge(response.data, body))
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
    console.log('GAJENDRA -> overrides1 -> ', overrides1 )
    console.log('GAJENDRA -> responseData1 -> ', responseData1 )
    if (overrides1) return interceptedRequest.continue(overrides1);
    if (responseData1) {
        return interceptedRequest.respond(responseData1);
    }
    interceptedRequest.continue();
}
