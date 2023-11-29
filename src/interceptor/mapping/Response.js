import _ from "lodash";

class Response {
    constructor(response) {
        this.status = response.status;
        this.headers = response.headers;
        this.contentType = response.contentType;
        this.body = response.body;
        this.mapFunctionPath = response.mapFunctionPath;
    }

    responseData(interceptedRequest) {
        const headers1 = interceptedRequest.method() === 'OPTIONS' ? _.merge(this.headers,
            {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Headers': "*",
                'Access-Control-Allow-Methods': "*",
                'Access-Control-Allow-Credentials': "true",
            }
        ) : _.merge(this.headers,
            {
                'Access-Control-Allow-Origin': "*"
            }
        )
        const status1 = interceptedRequest.method() === 'OPTIONS' ? 200 : this.status;
        return {
            status: status1,
            headers: headers1,
            contentType: this.contentType,
            body: this.body,
            mapFunctionPath: this.mapFunctionPath
        }
    }
}

export default Response;