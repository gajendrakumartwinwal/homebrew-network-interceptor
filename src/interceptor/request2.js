const _ = require("lodash");
const requestInterceptor = interceptedRequest => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;
    if (interceptedRequest.url() === 'https://weaver-loom-bex.rcp.partnerexperiences.test.exp-aws.net/graphql') {
        try {
            const payload = JSON.parse(interceptedRequest.postData());
            const result = _.merge([], payload, [
                {
                    variables: {
                        authenticationConfig: {
                            authToken: 'eyJraWQiOiJkNTI0NWEwMi0yODFmLTRhOWUtYjZiNi05MWFmNTFjZWJjMDYiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJjcC1pYW0iLCJzZXNzaW9uSWQiOiIxZjZjMjliNi04NDg4LTRlMjgtYTQzYS1kNWY3MDk4OGExMWMiLCJzdWJqZWN0VHlwZSI6IlNFUlZJQ0UiLCJ1c2VySWQiOiIxZjZjMjliNi04NDg4LTRlMjgtYTQzYS1kNWY3MDk4OGExMWMiLCJwYXJ0aWNpcGFudCI6eyJ0eXBlIjoiQ1VTVE9NRVIiLCJhdXRoU3RhdGUiOiJBTk9OWU1PVVMiLCJwYXlsb2FkIjpudWxsfSwic3ViamVjdElkIjoiMm11MW00N3A5M3BybjExNjI1bHY3YW1sY3EiLCJhdWQiOiJjcC1hY2UiLCJyb2xlQXNzaWdubWVudElkIjoiZjhmYmZlMWQtM2MxZS00NWI0LWE4NzQtOWM3MzBiNTc4ZDJiIiwiY2xpZW50QXBwTmFtZSI6InZhcC12aXJ0dWFsLWFnZW50LWNvbnRyb2wtdGVzdC10b29scyIsInBhcnRuZXJJZCI6Ii8iLCJ1c2VyVHlwZSI6IkNVU1RPTUVSIiwiZXhwIjoxNjkyMjE2NjUyLCJpYXQiOjE2OTIyMTM2NTJ9.PxZuz9xPtUhBoidyFMvDAY7eCF5qUT9hvdXtXE5komJsGWY2LcXs6y-RyQIWSP5qd0FW8kQynVJa5xnynIknd_ZeaZgFGfod0jVnj38CRAUfGvz-Lm3Ck2xNV2OvPfjz2z1kYo3j34EorepbGSwVHJiwKO29BG89CoOWdiy38Dnoj7eN1dlbTQ5nnT1E7PV0ZhsmgqQuW9TD1bN0K51oCQX5MlwFiMHphPdVArid3u8xeBYF_z99HoJt6TiFAQEuuIWOYSg0rygsVYM86TFg4PZix0JQxSMowBN5WPw_dPc-wCZFdI82ucX3A2xlxDha6__dd8QSMg6H2rvlHXwgqA'
                        }
                    }
                }
            ]);
            fetch({
                url: "https://vap.expedia.com/vacservice/isActive",
                headers: {
                    "key": "value"
                }
            })
            interceptedRequest.continue({postData: JSON.stringify(result)});
        } catch (e) {
            interceptedRequest.continue();
        }

    } else interceptedRequest.continue();
}

export default requestInterceptor;