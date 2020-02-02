import puppeteer from 'puppeteer';

describe('Product Test', () => {

  test('Click on "Add" button add the product to cart', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
  
    page.emulate({
      viewport: {
        width: 1500,
        height: 2400
      },
      userAgent: ''
    });
  
    await page.goto('http://localhost:8000/');
    await page.waitForSelector('.product');

    await page.click('#productGrid .product:nth-child(1) button')

    await page.waitForSelector('.cart-item');
    const cartItems = (await page.$$('.cart-item'));
    
    expect(cartItems.length).toBe(1);

    browser.close();
  }, 16000);
});