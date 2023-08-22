import Request from './Request'
import Response from './Response'
import middlewares from './middleware/index'
import {getMappingConfig, matchUrlPattern} from "./utils";
class Mapping{
    enhancer = (type, data) => {
        return middlewares.reduce((previousValue, middleware) => {
            return middleware(type, previousValue)
        }, data)
    }

    /**
     * For overriding request
     * @param interceptedRequest
     */
    async overrides(interceptedRequest) {
        const mappingConfig = await getMappingConfig();
        const config = mappingConfig.find(value => matchUrlPattern(value.url, interceptedRequest.url()));
        let overrides;
        if(config){
            const request = new Request(config.request);
            overrides = request.overrides(config.url, interceptedRequest);
        }
        return this.enhancer('request',overrides);
    }

    async responseData(interceptedRequest){
        const mappingConfig = await getMappingConfig();
        const config = mappingConfig.find(value =>  matchUrlPattern(value.url, interceptedRequest.url()));
        let responseData;
        if(config){
            const response = new Response(config.response);
            responseData = response.responseData(config.url, interceptedRequest);
        }
        return this.enhancer('response', responseData);
    }

}

const mapping = new Mapping();

export default mapping;
