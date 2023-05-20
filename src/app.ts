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

// https://brokescholar
app.get('/brokescholar', (req: Request, res: Response, next: NextFunction) => {
  puppeteer.use(StealthPlugin())
  const coupons : object[] = [];
  // puppeteer usage as normal
  puppeteer.launch({
    headless: false,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    userDataDir: 'C:/Users/mahmu/AppData/Local/Google/Chrome/User Data/Default'
  }).then(async browser => {
    console.log('Running tests..')
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(20 * 60 * 1000)
    const targetUrl = 'https://brokescholar.com/coupon-codes/doe-lashes' 
    await page.goto(targetUrl)
    const data_href = await page.$$eval('li .card', el => el.map(href => href.getAttribute("data-href")))
   const filterHref = data_href.filter(href => href !== null)
    const finalHref = filterHref.map(href => href?.split('=')[1]).filter(code => code !== undefined)
    for (const href of finalHref) {
      await page.goto(`${targetUrl}?deal=${href}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector(`.modal`)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = document.querySelector('.copy-code .code button')?.getAttribute('data-clipboard-text');
        return {
          couponCode
        }
      })
      if (coupon?.couponCode) coupons.push(coupon);
    }
    console.log(coupons);
    await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// https//couponcause.com
app.get('/couponcause', (req: Request, res: Response, next: NextFunction) => {
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
    await page.goto('https://couponcause.com/stores/prima-lash-promo-codes/?_c=/')
    const result = await page.$$eval('.tw-hidden .tw-relative .tw-bg-grey-lighter', el => el.map(code => (code as HTMLElement)?.innerText))
    console.log("🚀 ~ file: app.ts:91 ~ app.get ~ result:", result)
    await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// https//coupontoaster.com
app.get('/coupontoaster', (req: Request, res: Response, next: NextFunction) => {
  puppeteer.use(StealthPlugin())
  const coupons : object[] = [];
  // puppeteer usage as normal
  puppeteer.launch({
    headless: false,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    userDataDir: 'C:/Users/mahmu/AppData/Local/Google/Chrome/User Data/Default'
  }).then(async browser => {
    console.log('Running tests..')
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(20 * 60 * 1000)
    const targetUrl = 'https://coupontoaster.com/doelashes' 
    await page.goto(targetUrl)
   const links = await page.$$eval('.coupon .coupon-footer a', el => el.map(l => l.getAttribute('href')))
    const ids = links.map(num => num?.split('/')[4])
    for (const id of ids) {
      await page.goto(`${targetUrl}?c=${id}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector(`.modal`)
      // const coupon = elementHandle && await elementHandle.$eval('#div_1', code => (code as HTMLElement)?.innerText)
      // coupons.push(coupon)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const element = document.querySelector('#div_1')
        const couponCode = (element as HTMLElement)?.innerText
        return {
          couponCode
        }
      })
if(coupon?.couponCode) coupons.push(coupon)
    }
    console.log(coupons);
    await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// https//coupons.slickdeals.com
app.get('/coupons.slickdeals', (req: Request, res: Response, next: NextFunction) => {
  puppeteer.use(StealthPlugin())
  const coupons : object[] = [];
  // puppeteer usage as normal
  puppeteer.launch({
    headless: false,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    userDataDir: 'C:/Users/mahmu/AppData/Local/Google/Chrome/User Data/Default'
  }).then(async browser => {
    console.log('Running tests..')
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(20 * 60 * 1000)
    const targetUrl = 'https://coupons.slickdeals.net/' 
    await page.goto(targetUrl)
    const links = await page.$$eval('.bp-c-card_content .bp-c-card_imageContainer.bp-c-link', el => el.map(link => link.getAttribute("href")))
    const couponIdLinks = links.filter(l => l?.split('?').length === 2)
    for (const link of couponIdLinks) {
      await page.goto(`${link}`, {
        waitUntil: 'networkidle0'
      })
      const elementHandle = await page.waitForSelector(`.bp-c-popup`)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const element = document.querySelector('.bp-c-popup_content .bp-p-storeCouponModal_codeBlock .bp-p-storeCouponModal_code')
        const couponCode = (element as HTMLElement)?.innerText
        return {
          couponCode
        }
      })
      if(coupon?.couponCode) coupons.push(coupon)
    }
    console.log(coupons);
    await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// https//couponseeker.com
app.get('/couponseeker', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://couponseeker.com/doe-lashes-promo-codes/' 
    await page.goto(targetUrl)
    await page.click('.input-code .right-0 .code')
    const pages = await browser.pages()
    await page.goto(pages[2].url())
    const codes = await page.$$eval('.mt-4 .input-code input', el => el.map(code=> code.value))
    const cupons = codes.filter(c => c !== '')
    console.log("🚀 ~ file: app.ts:200 ~ app.get ~ cupons:", cupons)
    await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// https//deala.com
app.get('/deala', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://deala.com/doe-baby' 
    await page.goto(targetUrl)
    await page.click('.btn-wrapper button')
    const pages = await browser.pages()
    // await page.goto(pages[2].url())
    // const codes = await page.$$eval('.scroll-content .code-wrapper .code', el => el.map(code => (code as HTMLElement)?.innerText))
    // console.log("🚀 ~ file: app.ts:223 ~ app.get ~ codes:", codes)
    // await browser.close()
    console.log(page.url());
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// https//dealspotr.com
app.get('/dealspotr', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://dealspotr.com/promo-codes/doelashes.com' 
    await page.goto(targetUrl)
   const coupons = await page.$$eval('.pr.tar input', el => el.map(codes => codes.value))
    console.log("🚀 ~ file: app.ts:249 ~ app.get ~ coupons:", coupons)
    await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// https//epicsavers.com
app.get('/epicsavers', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://epicsavers.com/store/doe-lashes' 
    await page.goto(targetUrl)
    const coupons = await page.$$eval('.top-right .button.getCode', el => el.map(code => code.getAttribute('coupon-code')))
    console.log("🚀 ~ file: app.ts:272 ~ app.get ~ coupons:", coupons)
    
    await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// https//givingassistant.com
app.get('/givingassistant', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://givingassistant.org/coupon-codes/paradisefibers.com' 
    await page.goto(targetUrl)
    await page.click('.b2qzd24 button')
    console.log(page.url());
    // const pages = await browser.pages()
    // await page.goto(pages[1].url())
    // await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// https//gogetdeals.com
app.get('/gogetdeals', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://gogetdeals.co.uk/store/doelashes-com' 
    await page.goto(targetUrl)
    const coupons = await page.$$eval('.peel-btn-wrap .peel-code p', el => el.map(code => (code as HTMLElement)?.innerText))
    const filterCoupons = coupons.filter(code => code !== '')
    console.log("🚀 ~ file: app.ts:322 ~ app.get ~ filterCoupons:", filterCoupons)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// https//printfresh.knoji.com
app.get('/printfresh.knoji', (req: Request, res: Response, next: NextFunction) => {
  puppeteer.use(StealthPlugin())
  const coupons : string[] = [];
  // puppeteer usage as normal
  puppeteer.launch({
    headless: false,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    userDataDir: 'C:/Users/mahmu/AppData/Local/Google/Chrome/User Data/Default'
  }).then(async browser => {
    console.log('Running tests..')
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(20 * 60 * 1000)
    const targetUrl = 'https://printfresh.knoji.com/promo-codes/' 
    await page.goto(targetUrl)
    const links = await page.$$eval('.container300left__main .module', el => el.map(l => l.getAttribute('data-tab')))
    const filterLInks = links.filter(l => l !== null)
    for (const link of filterLInks) {
      await page.goto(`${link}`, {
        waitUntil: 'networkidle0'
      })
      const elementHandle = await page.waitForSelector(`.modal--wrap`)
    const coupon = elementHandle && await elementHandle.$$eval('.modal2 input', el => el.map(c => c.getAttribute('value')))
    coupon?.map(c => coupons.push(c as string))
    }
    const filterCoupons = coupons.filter((value, index, self) => {
      return self.indexOf(value) === index;
   })
     console.log("🚀 ~ file: app.ts:356 ~ app.get ~ filterCoupons:", filterCoupons)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})



export default app