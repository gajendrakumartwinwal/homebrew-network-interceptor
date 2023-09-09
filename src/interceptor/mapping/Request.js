import _ from "lodash";
import {getFunctionFromFile} from "./utils";

class Request {
    constructor(request) {
        this.method = request.method;
        this.mappedUrl = request.mappedUrl;
        this.postData = request.postData;
        this.headers = request.headers;
        this.mapFunctionPath = request.mapFunctionPath;
    }

    overrides(interceptedRequest) {
        const postRequestData = interceptedRequest.postData();
        const postData = _.merge(postRequestData ? JSON.parse(postRequestData) : {}, this.postData || {});
        const result = {
            url: this.mappedUrl || interceptedRequest.url(),
            method: this.method || interceptedRequest.method(),
            headers: _.merge({}, interceptedRequest.headers(), this.headers),
            postData: postData
        }
        if(this.mapFunctionPath) return getFunctionFromFile(this.mapFunctionPath)(result, _);
        return result;
    }
}

export default Request;