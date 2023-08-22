import {matchUrlPattern} from './utils'
import _ from "lodash";

class Response {
    constructor(response) {
        this.enable = response.enable;
        this.status = response.status;
        this.headers = response.headers;
        this.contentType = response.contentType;
        this.body = response.body;
    }

    responseData(url, interceptedRequest) {
        if (this.enable &&  matchUrlPattern(url, interceptedRequest.url())) {
            const headers1 = interceptedRequest.method() === 'OPTIONS' ?  _.merge(this.headers,
                {
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Headers': "*",
                    'Access-Control-Allow-Methods': "*",
                    'Access-Control-Allow-Credentials': "true",
                }
            ) :  _.merge(this.headers,
                {
                    'Access-Control-Allow-Origin': "*"
                }
            )
            return {
                status: this.status,
                headers:headers1,
                contentType: this.contentType,
                body: JSON.stringify(this.body)
            }
        }
        return null;
    }
}

export default Response;