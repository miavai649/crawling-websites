import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'


const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// http://wativ.com
app.get('/wativ', (req: Request, res: Response, next: NextFunction) => {
  puppeteer.use(StealthPlugin())

  // puppeteer usage as normal
  puppeteer.launch({
    headless: false,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    userDataDir: 'C:/Users/mahmu/AppData/Local/Google/Chrome/User Data/Default'
  }).then(async browser => {
    console.log('Running tests..')
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(20 * 60 * 1000)
    await page.goto('http://wativ.com/promo-codes/doe-lashes/')
    const result = await page.$$eval('.link-holder a', el => el.map(code => code.getAttribute('data-clipboard-text')))
    const filterCode = result.filter(code => code !== 'Redeem Offer')
    console.log("🚀 ~ file: app.ts:27 ~ app.get ~ filterCode:", filterCode)
    await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})





export default app