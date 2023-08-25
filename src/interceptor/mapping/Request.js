import _ from "lodash";

class Request {
    constructor(request) {
        this.method = request.method;
        this.mappedUrl = request.mappedUrl;
        this.postData = request.postData;
        this.headers = request.headers;
    }

    overrides(interceptedRequest) {
        const postRequestData = interceptedRequest.postData();
        const postData = _.merge(postRequestData ? JSON.parse(postRequestData) : {}, this.postData || {});
        return {
            url: this.mappedUrl || interceptedRequest.url(),
            method: this.method || interceptedRequest.method(),
            headers: _.merge({}, interceptedRequest.headers(), this.headers),
            postData: postData
        }
    }
}

export default Request;