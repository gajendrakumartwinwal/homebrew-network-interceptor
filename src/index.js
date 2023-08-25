import puppeteer from 'puppeteer'
import {requestInterceptor} from './interceptor/requestInterceptor'

export const URL = 'https://dummyjson.com/products/1';
(async function main() {
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