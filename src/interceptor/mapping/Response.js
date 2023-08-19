class Response {
    constructor(response) {
        this.enable = response.enable;
        this.status = response.status;
        this.headers = response.headers;
        this.contentType = response.contentType;
        this.body = response.body;
    }

    responseData(url, interceptedRequest) {
        if (this.enable && interceptedRequest.url() === url) {
            return {
                status: this.status,
                headers: this.headers,
                contentType: this.contentType,
                body: JSON.stringify(this.body)
            }
        }
        return null;
    }
}

export default Response;