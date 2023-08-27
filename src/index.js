import puppeteer from 'puppeteer'
import {requestInterceptor} from './interceptor/requestInterceptor'
import {generateMappingJSON} from "./interceptor/mapping/utils";

export const URL = 'https://dummyjson.com/products/1';
(async function main() {
    await generateMappingJSON();
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
    });
    const page = (await browser.pages())[0];
    // Enable request interception
    await page.setRequestInterception(true);
    // Get the user's screen dimensions
    page.on('request', requestInterceptor);
    const responseString = await page.goto(URL);
})()