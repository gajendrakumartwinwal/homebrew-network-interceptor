import axios from 'axios';
import {mergeResponse, requestInterceptor} from './requestInterceptor';
import mapping from './mapping';

// Mock axios module and mapping module
jest.mock('axios');
jest.mock('./mapping', () => ({
    overrides: jest.fn(),
    responseData: jest.fn(),
}));

let mockMergeResponse
describe('requestInterceptor', () => {
    mockMergeResponse = jest.fn()
    jest.mock('./requestInterceptor', () => ({
        mergeResponse: mockMergeResponse,
        requestInterceptor: jest.requireActual('./requestInterceptor').requestInterceptor,
    }));

    const interceptedRequest = {
        isInterceptResolutionHandled: jest.fn().mockReturnValue(false),
        continue: jest.fn(),
        respond: jest.fn(),
    };


    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return if resolution is handled', async () => {
        // Arrange
        interceptedRequest.isInterceptResolutionHandled.mockReturnValue(true);

        // Act
        await requestInterceptor(interceptedRequest);

        // Assert
        expect(interceptedRequest.continue).not.toHaveBeenCalled();
        expect(interceptedRequest.respond).not.toHaveBeenCalled();
    });
    it('should continue with overrides if overrides available', async () => {
        // Arrange
        interceptedRequest.isInterceptResolutionHandled.mockReturnValue(false);
        const mockOverrides = {method: {}, url: 'url', headers: {}, postData: {}}
        mapping.overrides.mockResolvedValue(mockOverrides);
        mockMergeResponse.mockReturnValue([mockOverrides, undefined])

        // Act
        await requestInterceptor(interceptedRequest);

        // Assert
        const stringifiedOverrides = mockOverrides ? {...mockOverrides, postData: JSON.stringify(mockOverrides.postData)} : mockOverrides
        expect(interceptedRequest.continue).toHaveBeenCalledTimes(1);
        expect(interceptedRequest.continue).toHaveBeenCalledWith(stringifiedOverrides);
        expect(interceptedRequest.respond).not.toHaveBeenCalled();
    });
    it('should respond with responseData if overrides is not available and responseData is available', async () => {
        // Arrange
        interceptedRequest.isInterceptResolutionHandled.mockReturnValue(false);
        const mockResponseData = {
            key: 'value'
        }
        mapping.overrides.mockResolvedValue(undefined);
        mapping.responseData.mockResolvedValue(mockResponseData);
        mockMergeResponse.mockReturnValue([undefined, mockResponseData])


        // Act
        await requestInterceptor(interceptedRequest);

        // Assert
        expect(interceptedRequest.respond).toHaveBeenCalledTimes(1);
        expect(interceptedRequest.respond).toHaveBeenCalledWith(mockResponseData);
        expect(interceptedRequest.continue).not.toHaveBeenCalled();
    });
    it('should continue without any data', async () => {
        // Arrange
        interceptedRequest.isInterceptResolutionHandled.mockReturnValue(false);
        mapping.overrides.mockResolvedValue(undefined);
        mapping.responseData.mockResolvedValue(undefined);
        mockMergeResponse.mockReturnValue([undefined, undefined])


        // Act
        await requestInterceptor(interceptedRequest);

        // Assert
        expect(interceptedRequest.continue).toHaveBeenCalledTimes(1);
        expect(interceptedRequest.continue).toHaveBeenCalledWith();
        expect(interceptedRequest.respond).not.toHaveBeenCalled();
    });
});
describe('mergeResponse', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.each([
        [undefined, {status: 'status', headers: {}, contentType: 'contentType', body: {}}],
        [{method: {}, url: 'url', headers: {}, postData: {}}, undefined],
        [undefined, undefined]
    ])('should return array of overrides and responseData if any of them is undefined', async (mockOverrides, mockResponseData) => {
        // Act
        const response = await mergeResponse(mockOverrides, mockResponseData);

        // Assert
        const stringifiedOverrides = mockOverrides ? {...mockOverrides, postData: JSON.stringify(mockOverrides.postData)} : mockOverrides
        const stringifiedResponseData = mockResponseData ? {...mockResponseData, body: JSON.stringify(mockResponseData.body)} : mockResponseData
        expect(response).toEqual([stringifiedOverrides, stringifiedResponseData])
    });

    describe('overrides and responseData both available', () => {
        const mockResponseData = {
            status: 200,
            headers: {
                mockHeaderKey: 'mockHeaderValue'
            },
            contentType: 'application/json',
            body: {
                mockBodyKey: 'mockBodyValue'
            }
        };
        const mockMethod = 'mockMethod'
        const mockURL = 'mockURL'
        const mockHeader = 'mockHeader'
        const mockPostData = {
            mockKey: 'mockValue'
        };
        const mockOverrides = {method: mockMethod, url: mockURL, headers: mockHeader, postData: mockPostData}


        it("should call axios for overrides", async () => {
            // Arrange
            axios.mockReturnValue({})
            await mergeResponse(mockOverrides, mockResponseData);

            // Assert
            expect(axios).toHaveBeenCalledWith({
                method: mockOverrides.method,
                url: mockOverrides.url,
                headers: mockOverrides.headers,
                data: mockOverrides.postData
            })
        })

        it.each([
            [undefined, undefined, {}],
            [undefined, {key1: 'value1'}, {key1: 'value1'}],
            [{key1: 'value1'}, undefined, {key1: 'value1'}],
            [{}, {key1: 'value1'}, {key1: 'value1'}],
            [{key1: 'value1'}, {}, {key1: 'value1'}],
            [{key1: 'value1'}, {key2: 'value2'}, {key1: 'value1', key2: 'value2'}],
            [{key1: 'value1'}, {key2: 'value2', key1: 'keyChanged'}, {key1: 'keyChanged', key2: 'value2'}]
        ])("header should be merged with axios response header", async (mockAxiosHeader, mockResponseHeader, expectedHeaders) => {
            // Arrange
            axios.mockResolvedValue({
                headers: mockAxiosHeader,
                data: {},
            });
            mockResponseData.headers = mockResponseHeader;

            // Act
            const [_, {headers}] = await mergeResponse(mockOverrides, mockResponseData);

            // Assert
            expect(headers).toEqual(expectedHeaders)
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
            [[{key1: 'value1'}, {key2: 'value2'}], [{key2: 'value2', key1: 'keyChanged'}], [{key1: 'keyChanged', key2: 'value2'}, {key2: 'value2'}]],
            [[{key1: 'value1'}], [{key2: 'value2', key1: 'keyChanged'}, {key2: 'value2'}], [{key1: 'keyChanged', key2: 'value2'}, {key2: 'value2'}]],
            [[{key1: 'value1'}, {key2: 'value2'}], [{key2: 'value2', key1: 'keyChanged'}, {key2: 'keyChanged'}], [{key1: 'keyChanged', key2: 'value2'}, {key2: 'keyChanged'}]]
        ])("body should be merged with axios body", async (mockAxiosBody, mockResponseBody, expectedBody) => {
            // Arrange
            axios.mockResolvedValue({
                headers: {},
                data: mockAxiosBody,
            });
            mockResponseData.body = mockResponseBody;

            // Act
            const [_, {body}] = await mergeResponse(mockOverrides, mockResponseData);

            // Assert
            expect(JSON.stringify(expectedBody)).toEqual(body)
        });

        it.each([
            [200, 200, 200],
            [200, undefined, 200],
            [200, 500, 500],
            [500, 200, 200],
        ])("status should be merged with axios status", async (mockAxiosStatus, mockResponseStatus, expectedStatus) => {
            // Arrange
            axios.mockResolvedValue({
                headers: {},
                data: {},
                status: mockAxiosStatus,
            });
            mockResponseData.status = mockResponseStatus;

            // Act
            const [_, {status}] = await mergeResponse(mockOverrides, mockResponseData);

            // Assert
            expect(expectedStatus).toEqual(status)
        });
        it.each([
            ['application/json', 'application/json', 'application/json'],
            ['application/json', undefined, 'application/json'],
            ['application/json', 'file', 'file'],
            ['file', 'application/json', 'application/json'],
        ])("contentType: %s should be merged with axios contentType %s", async (mockAxiosContentType, mockResponseContentType, expectedContentType) => {
            // Arrange
            axios.mockResolvedValue({
                headers: {},
                data: {},
                contentType: mockAxiosContentType,
            });
            mockResponseData.contentType = mockResponseContentType;

            // Act
            const [_, {contentType}] = await mergeResponse(mockOverrides, mockResponseData);

            // Assert
            expect(expectedContentType).toEqual(contentType)
        });
    })
});