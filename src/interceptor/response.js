const _ = require("lodash");
const requestInterceptor = async interceptedResponse => {
    if (interceptedResponse.isInterceptResolutionHandled()) return;
    if (interceptedResponse.url() === 'https://weaver-loom-bex.rcp.partnerexperiences.test.exp-aws.net/graphql') {
            const responseBody = await response.text();
            const modifiedResponseBody = responseBody.replace('<h1>', '<h1>Modified: ');

            // Create a new response with the modified content
            const modifiedResponse = {
                status: response.status(),
                headers: response.headers(),
                body: modifiedResponseBody,
            };

            // Fulfill the request with the modified response
        interceptedResponse.continue_frame._networkManager.emit('response', response._request, modifiedResponse);
    } else interceptedResponse.continue();
}

export default requestInterceptor;