import _ from "lodash";

class Request {
    constructor(request) {
        this.enable = request.enable;
        this.method = request.method;
        this.mappedUrl = request.mappedUrl;
        this.postData = request.postData;
        this.headers = request.headers;
    }

    overrides(url, interceptedRequest) {
        if (this.enable && url === interceptedRequest.url()) {
            return {
                url: this.mappedUrl || interceptedRequest.url(),
                method: this.method || interceptedRequest.method(),
                headers: _.merge({}, interceptedRequest.headers(), this.headers),
                postData: JSON.stringify(_.merge({}, interceptedRequest.postData(), this.postData))
            }
        }
        return null;
    }
}

export default Request;