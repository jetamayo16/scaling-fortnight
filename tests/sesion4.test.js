const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Desafío #3', async () => {
	let browser, page, buttonText

	before(async () => {
		browser = await puppeteer.launch({ headless: false, slowMo: 100 })
		page = await browser.newPage()
	})
	after(async () => {
		await browser.close()
	})
	beforeEach(async () => {})
	afterEach(async () => {})
	it('Desafío 4 - Navegador 1', async () => {
		await page.goto('https://www.drogueriascolsubsidio.com/MILO%20DOYPACK')
		await page.waitForSelector('body')

		const precio = await page.evaluate(() => {
			const element = document.querySelector('p.dataproducto-bestPrice')
			return element ? element.innerHTML : null
		})

		const nombre = await page.evaluate(() => {
			const element = document.querySelector('p.dataproducto-nameProduct')
			return element ? element.innerHTML : null
		})

		console.log('Nombre del producto:', nombre)
		console.log('Precio del producto en página inicial:', precio)

		buttonText = 'COMPRAR'
		await page.evaluate((buttonText) => {
			const buttons = Array.from(document.querySelectorAll('button'))
			const button = buttons.find((b) =>
				b.textContent.includes(buttonText)
			)
			if (button) {
				button.click()
			}
		}, buttonText)

		// Espera a que el iframe esté presente en el DOM
		await page.waitForSelector('#frame')

		// Accede al contenido del iframe
		const frameHandle = await page.$('#frame')
		const frame = await frameHandle.contentFrame()

		await frame.waitForSelector('#ajaxBusy')

		await frame.evaluate(() => {
			const button = document.querySelector('.btnBuyProdcut')
			if (button) {
				button.click()
			}
		})

		const precioCarrito = await frame.evaluate(() => {
			const element = document.querySelector('p.js-bestPrice')
			return element ? element.innerHTML : null
		})

		console.log('Precio del producto en el carrito:', precioCarrito)
		console.log('Ejecuta EXPECT...')
		expect(precio).to.equal(precioCarrito)
	})
})
