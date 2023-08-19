import puppeteer from 'puppeteer'
import requestInterceptor from './interceptor/requestInterceptor'

export const URL = 'https://vap.expedia.com/vacservice/buildInfo';
(async function main() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = (await browser.pages())[0];
    // Enable request interception
    await page.setRequestInterception(true);
    page.on('request', requestInterceptor);
    const responseString = await page.goto(URL);
})()