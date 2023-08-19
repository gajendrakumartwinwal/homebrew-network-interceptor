import mapping from "../mapping";
import logger from "../logger";

const checkForResponseInterceptor = (interceptedRequest) => {
    const responseData = mapping.responseData(interceptedRequest)
    if (responseData){
        logger('Response:', responseData)
        interceptedRequest.respond(responseData)
        return true;
    }
    return false;
}
export default checkForResponseInterceptor;