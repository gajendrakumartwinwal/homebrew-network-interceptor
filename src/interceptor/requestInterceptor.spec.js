import {mergeResponse, requestInterceptor} from './requestInterceptor';
import mapping from './mapping';

// Mock axios module and mapping module
jest.mock('axios');
jest.mock('./logger');
jest.mock('./mapping/utils', () => ({
    getMappingConfig: jest.fn(),
    matchUrlPattern: jest.fn(),
    generateMappingJSON: jest.fn(),
    getFunctionFromFile: jest.fn(),
}));
jest.mock('https', () => ({
    Agent: jest.fn(() => ({
    }))
}));
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
        process.env.NETWORK_INTERCEPTOR_LOGS=''
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