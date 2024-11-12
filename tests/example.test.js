const puppeteer = require('puppeteer')

describe('Mi primera prueba abriendo un navegador', () => {
	it('Desafío 2 - Opción 1', async () => {
		const browser = await puppeteer.launch({ headless: false })
		const page = await browser.newPage()
		await page.goto('https://www.exito.com/')
		
		await page.evaluate(() => {
			const images = Array.from(document.querySelectorAll('img'))
			
			console.log('Arreglo de imágenes:', images);
			const image = images.find((img) =>
				img.alt.includes('Todo para Navidad')
			)
			if (image) {
				image.click()
			}
			console.log('¿Encontró la imagen Todo para Navidad?:', image)
		})
		await browser.close()
	})
	it('Desafío 2 - Opción 2 selector', async () => {
		const browser = await puppeteer.launch({ headless: false })
		const page = await browser.newPage()
		await page.goto('https://www.exito.com/')

		// Espera a que la imagen esté presente en el DOM
		await page.waitForSelector('img[alt="Todo para Navidad"]')

		// Haz clic en la imagen
		await page.click('img[alt="Todo para Navidad"]')

		// Espera a que una imagen de regalos de Navidad esté presente en el DOM
		await page.waitForSelector('img[alt*="Regalos de navidad"]')

		// Verifica si la imagen de regalos de Navidad es visible
		const isGiftImageVisible =
			(await page.$('img[alt*="Regalos de navidad"]')) !== null
		console.log('¿Imagen regalos de navidad visible?:', isGiftImageVisible)

		await browser.close()
	})
	it('Desafío 2 - Opción 3 XPath...', async () => {
		const browser = await puppeteer.launch({ headless: false })
		const page = await browser.newPage()
		await page.goto('https://www.exito.com/')
		await page.waitForSelector('body')
		// Espera a que la imagen "Todo para Navidad" esté presente en el DOM usando XPath
		await page.evaluate(() => {
			const navidadImage = document.evaluate(
				"//img[@alt='Todo para Navidad']",
				document,
				null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,
				null
			).singleNodeValue
			if (navidadImage) {
				navidadImage.click()
			}
		})

		// Espera a que una imagen de regalos de Navidad esté presente en el DOM usando XPath
		await page.waitForFunction(() => {
			return (
				document.evaluate(
					"//img[contains(@alt, 'Regalos de navidad')]",
					document,
					null,
					XPathResult.FIRST_ORDERED_NODE_TYPE,
					null
				).singleNodeValue !== null
			)
		})

		// Validar si la imagen de regalos de Navidad está presente
		const isGiftImageVisible = await page.evaluate(() => {
			return (
				document.evaluate(
					"//img[contains(@alt, 'Regalos de navidad')]",
					document,
					null,
					XPathResult.FIRST_ORDERED_NODE_TYPE,
					null
				).singleNodeValue !== null
			)
		})
		console.log(
			'¿Imagen de Regalos de Navidad visible?:',
			isGiftImageVisible
		)

		await browser.close()
	})
})
