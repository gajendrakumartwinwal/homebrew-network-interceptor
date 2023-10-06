import mapping from "./mapping";
import logger from "./logger";
import mergeResponse from "./mergeresponse";
//import {printRequestChange, printResponseChange} from "./mapping/utils";
const _ = require("lodash");

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
