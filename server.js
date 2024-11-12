const puppeteer = require('puppeteer')

async function pruebaDeNavegador() {
	const browser = await puppeteer.launch({ headless: true})
    const page = await browser.newPage()
    await page.goto('https://www.carulla.com/')
    await page.waitForSelector('body');
    await browser.close()
}

pruebaDeNavegador()
