import puppeteer from 'puppeteer';

describe('App e2e Test', () => {

  
  test('Product List renders', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
  
    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });
  
    await page.goto('http://localhost:8000/');
    await page.waitForSelector('.filters');

    const filtersHtml = await page.$eval('.filters', (e: any) => e.innerHTML);
    expect(filtersHtml).toContain('All');

    browser.close();
  }, 16000);

  test('Click on filter changes product list', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
  
    page.emulate({
      viewport: {
        width: 500,
        height: 2400
      },
      userAgent: ''
    });
  
    await page.goto('http://localhost:8000/');
    await page.waitForSelector('.product');
    const allProducts = await page.$$('.product');
    expect(allProducts.length).toBeGreaterThan(0);

    await page.click('.filters > span:nth-child(2)')
    const favoriteProducts = await page.$$('.product');
    expect(favoriteProducts.length).toBeLessThan(allProducts.length);

    browser.close();
  }, 16000);
});