import Response from './Response'

describe('responseData', () => {
    
    it('option call should be add cors headers', () => {
            // Arrange
            const mockResponse = {
                status: 200,
                headers: {
                    key1: 'value1'
                },
                contentType: 'application/json',
                body: {
                    key1: 'value1'
                },
                mapFunctionPath: 'filepath'
            }
            const mockInterceptedRequest = {
                method: () => 'OPTIONS'
            }
            const corsHeaders = {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Headers': "*",
                'Access-Control-Allow-Methods': "*",
                'Access-Control-Allow-Credentials': "true",
            }
            const expectedResponse = {
                ...mockResponse,
                headers: {
                    ...corsHeaders,
                    key1: 'value1',
                }
            }

            // Act
            const response = new Response(mockResponse).responseData(mockInterceptedRequest);

            // Assert
            expect(response).toEqual(expectedResponse);
        });
    it('non option call should be add cors headers', () => {
            // Arrange
            const mockResponse = {
                status: 200,
                headers: {
                    key1: 'value1'
                },
                contentType: 'application/json',
                body: {
                    key1: 'value1'
                },
                mapFunctionPath: 'filepath'
            }
            const mockInterceptedRequest = {
                method: () => 'GET'
            }
            const corsHeaders = {
                'Access-Control-Allow-Origin': "*"
            }
            const expectedResponse = {
                ...mockResponse,
                headers: {
                    ...corsHeaders,
                    key1: 'value1',
                }
            }

            // Act
            const response = new Response(mockResponse).responseData(mockInterceptedRequest);

            // Assert
            expect(response).toEqual(expectedResponse);
        });
});