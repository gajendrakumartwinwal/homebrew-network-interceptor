import mapping from "./mapping";
import axios from "axios";
import logger from "./logger";
const _ = require("lodash");

const mergeResponse = async (overrides, responseData) => {
    if (responseData && overrides) {
        const {method, url, headers, postData} = overrides;
        const request = {
            method: method,
            url,
            headers,
            data: JSON.parse(postData)
        }
        let response = {};
        try{
            response = await axios(request);
        }catch (e){
           console.log('GAJENDRA', e);
        }
        const {status, headers: responseHeader, contentType, body} = responseData;
        const updatedResposeData = {
            status: status,
            headers: _.merge({},response.headers, responseHeader, ),
            contentType: contentType,
            body: JSON.stringify(_.merge({}, response.data, JSON.parse(body)))
        }
        return [undefined, updatedResposeData];
    }
    return [overrides, responseData];
}
const requestInterceptor = async (interceptedRequest) => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;
    const overrides = await mapping.overrides(interceptedRequest);
    const responseData = await mapping.responseData(interceptedRequest);
    const [overrides1, responseData1] = await mergeResponse(overrides, responseData);
    if (overrides1) return interceptedRequest.continue(overrides1);
    if (responseData1) {
        return interceptedRequest.respond(responseData1);
    }
    interceptedRequest.continue();
}

export default requestInterceptor;