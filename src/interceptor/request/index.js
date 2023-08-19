import mapping from "../mapping";
import logger from "../logger";

const checkForRequestInterceptor = (interceptedRequest) => {
    const overrides = mapping.overrides(interceptedRequest)
    if (overrides) {
        logger('Request:', overrides)
        interceptedRequest.continue(overrides);
        return true;
    }
    return false;
}
export default checkForRequestInterceptor;