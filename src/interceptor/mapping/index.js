import Request from './Request'
import Response from './Response'
import {getMappingConfig, matchUrlPattern} from "./utils";

class Mapping {

    /**
     * For overriding request
     * @param interceptedRequest
     */
    async overrides(interceptedRequest) {
        const mappingConfig = await getMappingConfig();
        const requestURL = interceptedRequest.url();
        const requestMethod = interceptedRequest.method();
        const config = mappingConfig.find(
            ({url, request: {enable, method} = {}}) => enable && method === requestMethod && matchUrlPattern(url, requestURL)
        );
        let overrides;
        if (config) {
            const request = new Request(config.request);
            overrides = request.overrides(interceptedRequest);
        }
        return overrides;
    }

    async responseData(interceptedRequest) {
        const mappingConfig = await getMappingConfig();
        const requestURL = interceptedRequest.url();
        const requestMethod = interceptedRequest.method();
        const config = mappingConfig.find(({url, response:{enable, method} = {}}) => enable && method === requestMethod && matchUrlPattern(url, requestURL));
        let responseData;
        if (config) {
            const response = new Response(config.response);
            responseData = response.responseData(interceptedRequest);
        }
        return responseData;
    }
}

const mapping = new Mapping();

export default mapping;
