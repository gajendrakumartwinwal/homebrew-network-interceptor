import {matchUrlPattern} from './utils'
import _ from "lodash";
import logger from "../logger";

class Request {
    constructor(request) {
        this.enable = request.enable;
        this.method = request.method;
        this.mappedUrl = request.mappedUrl;
        this.postData = request.postData;
        this.headers = request.headers;
    }

    overrides(url, interceptedRequest) {
        if (this.enable && matchUrlPattern(url, interceptedRequest.url())) {
            const postRequestData = interceptedRequest.postData();
            console.log('TYOE', typeof interceptedRequest.postData(), interceptedRequest.postData())
            const postData = _.merge(postRequestData ? JSON.parse(postRequestData): {}, this.postData || {});
            console.log('GAJENDRA: POST DATA', this.postData)
            // logger('GAJENDRA: POST DATA1', JSON.parse(postData))
            return {
                url: this.mappedUrl || interceptedRequest.url(),
                method: this.method || interceptedRequest.method(),
                headers: _.merge({}, interceptedRequest.headers(), this.headers),
                postData: JSON.stringify(postData)
            }
        }
        return null;
    }
}

export default Request;