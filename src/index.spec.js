import puppeteer from 'puppeteer'
import {requestInterceptor} from './interceptor/requestInterceptor'
import {generateMappingJSON} from "./interceptor/mapping/utils";

jest.mock('puppeteer')
jest.mock('./interceptor/mapping/utils', () => ({
    getMappingConfig: jest.fn(),
    matchUrlPattern: jest.fn(),
    generateMappingJSON: jest.fn().mockResolvedValue(),
}));
jest.mock('./interceptor/requestInterceptor')

let mockPage;
describe("index.js", () => {
    mockPage = {
        setRequestInterception: jest.fn(),
        on: jest.fn(),
        goto: jest.fn().mockResolvedValue(true),
    };

    const mockBrowser = {
        pages: jest.fn().mockReturnValue([mockPage]),
    };

    beforeEach(() => {
        puppeteer.launch = jest.fn().mockReturnValue(mockBrowser);

    });

    it('puppeteer launch should have been called', async () => {
        // Action
        await require('./index');

        // Assert
        expect(puppeteer.launch).toHaveBeenCalledWith({
            headless: false,
            devtools: true,
        })
    });
    it('setRequestInterception should called on page', async () => {
        // Action
        await require('./index');

        // Assert
        expect(mockPage.setRequestInterception).toHaveBeenCalledWith(true)
    });
    it('on request listener should called on page', async () => {
        // Arrange

        // Action
        await require('./index');

        // Assert
        expect(mockPage.on).toHaveBeenCalledWith('request', requestInterceptor)
    });
    it('goto url should called on page', async () => {
        // Arrange

        // Action
        await require('./index');

        // Assert
        expect(mockPage.goto).toHaveBeenCalledWith("https://dummyjson.com/products/1")
    });
})

