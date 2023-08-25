import Request from './Request'
import Response from './Response'
import {getMappingConfig, matchUrlPattern} from "./utils";
import mapping from "./index";

const mockOverrides = 'mockOverrides';
const mockResponseData = 'mockResponseData';
jest.mock('./utils', () => ({
    getMappingConfig: jest.fn(),
    matchUrlPattern: jest.fn(),
}));
jest.mock('./Request', () => {
    return jest.fn().mockImplementation(() => {
        return {
            overrides: jest.fn().mockReturnValue(mockOverrides)
        };
    });
});
jest.mock('./Response', () => {
    return jest.fn().mockImplementation(() => {
        return {
            responseData: jest.fn().mockReturnValue(mockResponseData)
        };
    });
});

const mockInterceptURL = 'http://testurl'
const mockURL1 = 'http://url1'
const mockInterceptedRequest = {
    url: () => mockInterceptURL
}
describe('overrides', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return undefined overrides if url is not found in mapping & request is enabled & should matchUrlPattern', async () => {
        // Arrange

        getMappingConfig.mockResolvedValue([
            {url: mockURL1, request: {enable: true}},
        ])
        matchUrlPattern.mockReturnValue(false);

        // Act
        const overrides = await mapping.overrides(mockInterceptedRequest);

        // Assert
        expect(matchUrlPattern).toHaveBeenCalledTimes(1);
        expect(matchUrlPattern).toHaveBeenCalledWith(mockURL1, mockInterceptURL);
        expect(overrides).toBeUndefined();
    });
    it('should return undefined overrides request is not enabled & should not call matchUrlPattern', async () => {
        // Arrange

        getMappingConfig.mockResolvedValue([
            {url: mockURL1, request: {enable: false}},
        ])

        // Act
        const overrides = await mapping.overrides(mockInterceptedRequest);

        // Assert
        expect(matchUrlPattern).toHaveBeenCalledTimes(0);
        expect(overrides).toBeUndefined();
    });

    it('should return overrides from request if url is found in mapping & requst is enabled', async () => {
        // Arrange


        getMappingConfig.mockResolvedValue([
            {url: mockURL1, request: {enable: true}},
        ])

        matchUrlPattern.mockReturnValue(true);

        // Act
        const overrides = await mapping.overrides(mockInterceptedRequest);

        // Assert
        expect(matchUrlPattern).toHaveBeenCalledTimes(1);
        expect(matchUrlPattern).toHaveBeenCalledWith(mockURL1, mockInterceptURL);
        expect(overrides).toEqual(mockOverrides);
    });
});
describe('responseData', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return undefined responseData if url is not found in mapping & response is enabled & should matchUrlPattern', async () => {
        // Arrange

        getMappingConfig.mockResolvedValue([
            {url: mockURL1, response: {enable: true}},
        ])
        matchUrlPattern.mockReturnValue(false);

        // Act
        const responseData = await mapping.responseData(mockInterceptedRequest);

        // Assert
        expect(matchUrlPattern).toHaveBeenCalledTimes(1);
        expect(matchUrlPattern).toHaveBeenCalledWith(mockURL1, mockInterceptURL);
        expect(responseData).toBeUndefined();
    });
    it('should return undefined responseData if response is not enabled & should not call matchUrlPattern', async () => {
        // Arrange

        getMappingConfig.mockResolvedValue([
            {url: mockURL1, response: {enable: false}},
        ])

        // Act
        const responseData = await mapping.responseData(mockInterceptedRequest);

        // Assert
        expect(matchUrlPattern).toHaveBeenCalledTimes(0);
        expect(responseData).toBeUndefined();
    });
    it('should return responseData from response if url is found in mapping  & requst is enabled', async () => {
        // Arrange

        getMappingConfig.mockResolvedValue([
            {url: mockURL1, response: {enable: true}},
        ])
        matchUrlPattern.mockReturnValue(true);

        // Act
        const responseData = await mapping.responseData(mockInterceptedRequest);

        // Assert
        expect(matchUrlPattern).toHaveBeenCalledTimes(1);
        expect(matchUrlPattern).toHaveBeenCalledWith(mockURL1, mockInterceptURL);
        expect(responseData).toEqual(mockResponseData);
    });
});