import Request from './Request'
import urils from "./utils";
import _ from "lodash";

jest.mock('./utils', () => ({
    getMappingConfig: jest.fn(),
    matchUrlPattern: jest.fn(),
    generateMappingJSON: jest.fn(),
    getFunctionFromFile: jest.fn(),
}));

describe('overrides', () => {

    it.each([
        [undefined, undefined, {}],
        [undefined, {key1: 'value1'}, {key1: 'value1'}],
        [{key1: 'value1'}, undefined, {key1: 'value1'}],
        [{}, {key1: 'value1'}, {key1: 'value1'}],
        [{key1: 'value1'}, {}, {key1: 'value1'}],
        [{key1: 'value1'}, {key2: 'value2'}, {key1: 'value1', key2: 'value2'}],
        [{key1: 'value1'}, {key2: 'value2', key1: 'keyChanged'}, {key1: 'keyChanged', key2: 'value2'}]
    ])('headers should be merged with interceptedRequestHeaders',
        async (
            mockInterceptedRequestHeaders,
            mockRequestHeader,
            expectedOverridesHeaders
        ) => {
            // Arrange
            const mockInterceptedRequest = {
                url: jest.fn(),
                method: jest.fn(),
                postData: jest.fn(),
                headers: () => mockInterceptedRequestHeaders,
            }

            // Act
            const {headers: overridesHeaders} = new Request({headers: mockRequestHeader}).overrides(mockInterceptedRequest);

            // Assert
            expect(overridesHeaders).toEqual(expectedOverridesHeaders);
        });

    it.each([
        [undefined, undefined, {}],
        [undefined, {key1: 'value1'}, {key1: 'value1'}],
        [{key1: 'value1'}, undefined, {key1: 'value1'}],
        [{}, {key1: 'value1'}, {key1: 'value1'}],
        [{key1: 'value1'}, {}, {key1: 'value1'}],
        [{key1: 'value1'}, {key2: 'value2'}, {key1: 'value1', key2: 'value2'}],
        [{key1: 'value1'}, {key2: 'value2', key1: 'keyChanged'}, {key1: 'keyChanged', key2: 'value2'}],
        [[{key1: 'value1'}], [{key2: 'value2', key1: 'keyChanged'}], [{key1: 'keyChanged', key2: 'value2'}]],
        [[{key1: 'value1'}, {key2: 'value2'}], [{key2: 'value2', key1: 'keyChanged'}], [{
            key1: 'keyChanged',
            key2: 'value2'
        }, {key2: 'value2'}]],
        [[{key1: 'value1'}], [{key2: 'value2', key1: 'keyChanged'}, {key2: 'value2'}], [{
            key1: 'keyChanged',
            key2: 'value2'
        }, {key2: 'value2'}]],
        [[{key1: 'value1'}, {key2: 'value2'}], [{
            key2: 'value2',
            key1: 'keyChanged'
        }, {key2: 'keyChanged'}], [{key1: 'keyChanged', key2: 'value2'}, {key2: 'keyChanged'}]]
    ])('postData should be merged with interceptedRequestPostData',
        async (
            mockInterceptedRequestPostData,
            mockRequestPostData,
            expectedOverridesPostData,
        ) => {
            // Arrange
            const mockInterceptedRequest = {
                url: jest.fn(),
                method: jest.fn(),
                postData: () => JSON.stringify(mockInterceptedRequestPostData),
                headers: jest.fn(),
            }

            // Act
            const {postData: overridesPostData} = new Request({postData: mockRequestPostData}).overrides(mockInterceptedRequest);

            // Assert
            expect(overridesPostData).toEqual(expectedOverridesPostData);
        });

    it.each([
        ['http://url1', 'http://url1', 'http://url1'],
        ['http://url1', undefined, 'http://url1'],
        ['http://url1', 'http://url2', 'http://url2'],
    ])('url should be merged with interceptedRequestUrl',
        async (
            mockInterceptedRequestUrl,
            mockRequestUrl,
            expectedOverridesUrl,
        ) => {
            // Arrange
            const mockInterceptedRequest = {
                url: () => mockInterceptedRequestUrl,
                method: jest.fn(),
                postData: jest.fn(),
                headers: jest.fn(),
            }

            // Act
            const {url: overridesUrl} = new Request({mappedUrl: mockRequestUrl}).overrides(mockInterceptedRequest);

            // Assert
            expect(overridesUrl).toEqual(expectedOverridesUrl);
        });

    it.each([
        ['get', 'get', 'get'],
        ['get', undefined, 'get'],
        ['get', 'post', 'post'],
    ])('method should be merged with interceptedRequestMethod',
        async (
            mockInterceptedRequestMethod,
            mockRequestMethod,
            expectedOverridesMethod,
        ) => {
            // Arrange
            const mockInterceptedRequest = {
                url: () => jest.fn(),
                method: () => mockInterceptedRequestMethod,
                postData: jest.fn(),
                headers: jest.fn(),
            }

            // Act
            const {method: overridesMethod} = new Request({method: mockRequestMethod}).overrides(mockInterceptedRequest);

            // Assert
            expect(overridesMethod).toEqual(expectedOverridesMethod);
        });

    it('mapFunction should be called if avalable and return mapped request', async () => {
        // Arrange
        const mockInterceptedRequestHeaders = {
            'headerkey': 'headerValue'
        }
        const mockInterceptedRequestPostData = {
            'postdatakey': 'postdatavalue'
        }
        const mockInterceptedRequest = {
            url: () => 'http://testurl1',
            method: () => 'get',
            postData: () => JSON.stringify(mockInterceptedRequestPostData),
            headers: () => mockInterceptedRequestHeaders,
        }
        const mapFunctionPath = 'mockFilePath'
        const mockMapFuntion = () => ({
            url: 'http://testurl2',
            method: 'post',
            headers: {
                'mapFunctionHeaderKey': 'mapFunctionHeaderValue'
            },
            postData: {
                'mapFunctionPostDataKey': 'mapFunctionPostDataValue'
            },
        })
        urils.getFunctionFromFile.mockReturnValue(mockMapFuntion)
        // Act
        const result = new Request({mapFunctionPath: mapFunctionPath}).overrides(mockInterceptedRequest, _);

        // Assert
        expect(result).toEqual(mockMapFuntion());
    });
});