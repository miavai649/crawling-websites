import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'


const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// no.1  http://wativ.com 
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

// no.2 https://brokescholar
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

// no.3 https//couponcause.com
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

// no.4 https//coupons.slickdeals.com
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

// no.5 https//couponseeker.com
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

// no.6 https//coupontoaster.com
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





// no.7 https//deala.com-------------------------------------------------------------------------------------------------------------------
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
    await page.goto(pages[0].url())
    console.log(page.url());
    // const codes = await page.$$eval('.scroll-content .code-wrapper .code', el => el.map(code => (code as HTMLElement)?.innerText))
    // console.log("🚀 ~ file: app.ts:223 ~ app.get ~ codes:", codes)
    // await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.8 https//dealrated.com-------------------------------------------------------------------------------------------------------------------
app.get('/dealrated', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://dealrated.com/store/doe-lashes' 
    await page.goto(targetUrl)
    const codes = await page.$$eval('.row.coupon-row .desktop-btn .coupon-button', el => el.map(code => code.getAttribute('coupon')))
    console.log("🚀 ~ file: app.ts:253 ~ app.get ~ codes:", codes)
    await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// n0.9 https//dealspotr.com
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

// no.10 https//epicsavers.com
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

// no.11 https//givingassistant.com---------------------------------------------------------------------------------------------------------
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
    const buttons = await page.$$('.c1j1ont7 .c1b9k5e2 .b2qzd24 button')
    // console.log("🚀 ~ file: app.ts:323 ~ app.get ~ buttons:", buttons)
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];

      await button.click();
      
    }
    const pages = await browser.pages()
    await page.goto(pages[1].url())
    // console.log(page.url());
    await page.waitForSelector('.subscribe')
    const codes = await page.$$eval('.ct0nlwf .c136lbfo input', el => el.map(code => code.getAttribute('value')))
    console.log("🚀 ~ file: app.ts:325 ~ app.get ~ codes:", codes)
    
    await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.12 https//gogetdeals.com
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

// no.13 https//printfresh.knoji.com
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

// no.14 https//refermatei.com
app.get('/refermate', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://refermate.com/stores/doe-lashes-promo-codes' 
    await page.goto(targetUrl)
    const coupons = await page.$$eval('.right a', el => el.map(code => code.getAttribute('data-clipboard-text')))
   const filterCode = coupons.filter(c => c !== null)
     console.log("🚀 ~ file: app.ts:383 ~ app.get ~ filterCode:", filterCode)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.15 https//couponbirds.com
app.get('/couponbirds', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.couponbirds.com/codes/doelashes.com' 
    await page.goto(targetUrl)
    const links = await page.$$eval('.deal .deal-desc .get-code a', el => el.map(lin => lin.getAttribute('data-url')))
    for (const link of links) {
      await page.goto(`${link}`, {
        waitUntil: 'networkidle0'
      })
      const elementHandle = await page.waitForSelector(`.modal`)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = document.querySelector('#copy-code')?.getAttribute('value')
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

// no.16 https//couponchief.com-------------------------------------------------------------------------------------------------------------
app.get('/couponchief', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.couponchief.com/paradisefibers' 
    await page.goto(targetUrl)
    const couponId = await page.$$eval('.store-coupon', el => el.map(id => id.getAttribute("data-coupon-id")))
    const filterId = couponId.filter(id => id !== null)
    for (const id of filterId) {
      await page.goto(`${targetUrl} #coupon=${id}`, {
        waitUntil: 'networkidle0'
      })
      console.log(page.url());
    }
    //  await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.17 https//couponcode.com-------------------------------------------------------------------------------------------------------------
app.get('/couponcode', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.couponcode.in/doelashes/' 
    await page.goto(targetUrl)
    const ids = await page.$$eval('.media-body .get-code', el => el.map(id => id.getAttribute('data-id')))
    for (const id of ids) {
      await page.goto(`${targetUrl}?open=${id}`, {
        waitUntil: 'networkidle0'
      })
      
      await page.click('.media-body .coupon-discount-popup')
      
      console.log(page.url());
    const elementHandle = await page.waitForSelector('.modal-dialog')
     const coupon = elementHandle && await elementHandle.evaluate(() => {
      const couponCode = document.querySelector('.media-body .coupon-code .show-code input')?.getAttribute('value')
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

// no.18 https//couponkirin.com-------------------------------------------------------------------------------------------------------------
app.get('/couponkirin', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.couponkirin.com/merchants/printfresh' 
    await page.goto(targetUrl)
    const ids = await page.$$eval('.wrapper   .btn-wrapper button', el => el.map(id => id.getAttribute('data-id')))
    for (const id of ids) {
      await page.goto(`${targetUrl}?couponid=${id}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector(`.dialog-wrap`)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = document.querySelector('.code .code-box button')?.getAttribute('data-clipboard-text')
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

// no.19 https//dealdrop.com-------------------------------------------------------------------------------------------------------------
app.get('/dealdrop', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.dealdrop.com/doe-lashes?d=showCode' 
    await page.goto(targetUrl)
    const coupons = await page.$$eval('.justify-between.flex-col div button', el => el.map(code => (code as HTMLElement)?.innerText))
    console.log("🚀 ~ file: app.ts:551 ~ app.get ~ coupons:", coupons)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.20 https//discountreactor.com-------------------------------------------------------------------------------------------------------------
app.get('/discountreactor', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.discountreactor.com/coupons/doelashes.com' 
    await page.goto(targetUrl)
   const codes = await page.$$eval('.offer-list-item-right .offer-list-item-title-section .offer-list-item-button-content a .offer-list-item-button_hidden-code', el => el.map(code => code.getAttribute('data-code')))
     console.log("🚀 ~ file: app.ts:575 ~ app.get ~ codes:", codes)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.21 https//dontpayfull.com-------------------------------------------------------------------------------------------------------------
app.get('/dontpayfull', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.dontpayfull.com/at/printfresh.com' 
    await page.goto(targetUrl)
    const data_id = await page.$$eval('#active-coupons li', el => el.map(d => d.getAttribute('data-id')))
    const filterDataId = data_id.filter(d => d !== null)
    for (const id of filterDataId) {
      await page.goto(`${targetUrl}?c=${id}#c${id}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector('.floating-box-content')
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = (document.querySelector('.offer-code .code-box h2') as HTMLElement)?.innerText
        return {
          couponCode
        }
      })
      if (coupon?.couponCode) coupons.push(coupon)
    }
    console.log(coupons);
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.22 https//emucoupon.com-------------------------------------------------------------------------------------------------------------
app.get('/emucoupon', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.emucoupon.com/code/doelashes' 
    await page.goto(targetUrl)
    const ids = await page.$$eval('.container .col-9 .coupons', el => el.map(id => id.getAttribute('id')))
    for (const id of ids) {
      await page.goto(`${targetUrl}/${id}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector(`#contact`)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode =document.querySelector('.codeboxbtn input')?.getAttribute('value')
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

// no.23 https//greenpromocode.com-------------------------------------------------------------------------------------------------------------
app.get('/greenpromocode', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.greenpromocode.com/coupons/printfresh/' 
    // const url = 'https://www.greenpromocode.com'
    await page.goto(targetUrl)
    const links = await page.$$eval('.get_code_btn .go_link', el => el.map(id => id.getAttribute('view-href')))
    const ids = links.map(id => id?.split('=')[1])
    for (const id of ids) {
      await page.goto(`${targetUrl}?view=${id}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector(`.coupon_item.filter_all.filter_code`)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = (document.querySelector('.get_code_btn .code.text_center') as HTMLElement)?.innerText
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

// no.24 https//hotdeals.com-------------------------------------------------------------------------------------------------------------
app.get('/hotdeals', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.hotdeals.com/coupons/doux-lashes-coupon' 
    await page.goto(targetUrl)
    const links = await page.$$eval('.list div', el => el.map(id => id.getAttribute('data-href')))
    const filterLinks = links.filter(l => l !== null)
    const ids = filterLinks.map(i => i?.split('?')[0])
    const finalIds = ids.map(id => id?.split('/')[2])
    for (const id of finalIds) {
      await page.goto(`${targetUrl}?popcid=${id}&ads=1`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector(`.dialog-hascoupert-hascode`)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = (document.querySelector('.copy-attach .code-box .code') as HTMLElement)?.innerText
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

// no.25 https//moneysaveme.com-------------------------------------------------------------------------------------------------------------
app.get('/moneysaveme', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.moneysaveme.com/store/doelashes.com' 
    await page.goto(targetUrl)
    const couponCodes = await page.$$eval('.showcode button', el => el.map(code => code.getAttribute('data-clipboard-text')))
     console.log("🚀 ~ file: app.ts:718 ~ app.get ~ couponCodes:", couponCodes)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.26 https//offers.com-------------------------------------------------------------------------------------------------------------
app.get('/offers', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.offers.com/stores/printfresh/' 
    await page.goto(targetUrl)
    const ids = await page.$$eval('.offer-strip-container .offerstrip', el => el.map(id => id.getAttribute('data-offer-id')))
    for (const id of ids) {
      await page.goto(`${targetUrl}?em=${id}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector(`#modal`)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = document.querySelector('#offer-info .code-box #copy-code-btn')?.getAttribute("data-clipboard-text")
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

// no.27 https//prmdeal.com-------------------------------------------------------------------------------------------------------------
app.get('/prmdeal', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.prmdeal.com/coupon-codes/doe-lashes-free-shipping-code/' 
    await page.goto(targetUrl)
    const codes = await page.$$eval('.main_rcon1.each_ul .the_coupon_data', el => el.map(code => code.getAttribute('att_code')))
    const filterCode = codes.filter(c => c !== '')
     console.log("🚀 ~ file: app.ts:781 ~ app.get ~ filterCode:", filterCode)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.28 https//promopro.com-------------------------------------------------------------------------------------------------------------
app.get('/promopro', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.promopro.co.uk/us/printfresh-promo-codes' 
    await page.goto(targetUrl)
    const codes = await page.$$eval('.btn-wrapper .pc-btn button .coupon-button-code .hiddenCode', el => el.map(c => (c as HTMLElement)?.innerText))
     console.log("🚀 ~ file: app.ts:805 ~ app.get ~ codes:", codes)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.29 https//savingarena.com-------------------------------------------------------------------------------------------------------------
app.get('/savingarena', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.savingarena.com/doe-lashes-coupon-codes' 
    await page.goto(targetUrl)
    const codes = await page.$$eval('.couponbox .curve-btn .codeletters', el => el.map(code => (code as HTMLElement)?.innerText))
    const filterCodes = codes.map(c => c.split(':')[1])
     console.log("🚀 ~ file: app.ts:830 ~ app.get ~ filterCodes:", filterCodes)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.30 https//sociablelabs.com-------------------------------------------------------------------------------------------------------------
app.get('/sociablelabs', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.sociablelabs.com/printfresh-coupons' 
    await page.goto(targetUrl)
    const links = await page.$$eval('.hidden-sm .reveal_btn.goto_store.show-code.top-store-button', el => el.map(l => l.getAttribute('href')))
    // console.log("🚀 ~ file: app.ts:854 ~ app.get ~ links:", links)
    for (const link of links) {
      await page.goto(`${link}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector(`#myModal`)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = document.querySelector('.clipboards form .form-group .input-group .input-group-addon')?.getAttribute('data-clipboard-text')
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

// no.31 https//thephuketnews.com-------------------------------------------------------------------------------------------------------------
app.get('/thephuketnews', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.thephuketnews.com/deals/doe-lashes' 
    await page.goto(targetUrl)
    const ids = await page.$$eval('li .coupon_wrapper.detail_filter_all.detail_filter_code  a', el => el.map(id => id.getAttribute('data-cid')))
   
    for (const id of ids) {
      await page.goto(`${targetUrl}?promoid=${id}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector(`.coupon_detail`)
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = (document.querySelector('.copy_code #codeText') as HTMLElement)?.innerText
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

// no.32 https//wethrift.com-------------------------------------------------------------------------------------------------------------
app.get('/wethrift', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.wethrift.com/doe-lashes-' 
    await page.goto(targetUrl)
    await page.click('.css-1lmlji8 div button')
    const pages = await browser.pages()
    await page.goto(pages[2].url())
    // console.log(page.url());
    const elementHandle = await page.waitForSelector('.css-3dryow')
    const coupon = elementHandle && await page.$$eval('.css-1lmlji8 div button .css-zsgcvb', el => el.map(code => (code as HTMLElement).innerText))
    const singleCode = await page.$eval('.css-1fc3731 .css-ct7cre .css-igmnyf', c => (c as HTMLElement).innerText)
    // console.log("🚀 ~ file: app.ts:938 ~ app.get ~ singleCode:", singleCode)
    coupon?.unshift(singleCode)
    console.log("🚀 ~ file: app.ts:937 ~ app.get ~ coupon:", coupon)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.33 https//retailmenot.com-------------------------------------------------------------------------------------------------------------
app.get('/retailmenot', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.retailmenot.com/' 
    const url = 'https://www.retailmenot.com'
    await page.goto(targetUrl)
    const linkObj = await page.$$eval('.relative .block', el => el.map(li => li.getAttribute('x-data')))
    const filterLink = linkObj.filter(li => li !== null)
    const links = filterLink.map(li => li?.split(' ')[1])
    const finalLink = links.map(li => li?.replace(/\'|,$/g, ""))
    for (const link of finalLink) {
      await page.goto(`${url}${link}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector(".Modal__StyledModal-sc-1av73vo-1")
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = (document.querySelector('.CopyCode__StyledCopyCode-sc-10h0ylz-0.bOHBoy .CopyCode__Content-sc-10h0ylz-1 .CopyCode__Code-sc-10h0ylz-2.cVSRcS') as HTMLElement)?.innerText
        return {
          couponCode
        }
      })
      // console.log(coupon);
      if (coupon?.couponCode) coupons.push(coupon)
    }
    console.log(coupons);
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.34 https//rakuten.com-------------------------------------------------------------------------------------------------------------
app.get('/rakuten', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.rakuten.com/printfresh.com' 
    await page.goto(targetUrl)
    const codes = await page.$$eval('.coupon-blk .coupon-info .coupon-code-blk .coupon-code', el => el.map(code => code.getAttribute('data-clipboard-text')))
     console.log("🚀 ~ file: app.ts:1007 ~ app.get ~ codes:", codes)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.35 https//dealscove.com-------------------------------------------------------------------------------------------------------------
app.get('/dealscove', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.dealscove.com/coupons/paradisefibers.com' 
    const url = 'https://www.dealscove.com/'
    await page.goto(targetUrl)
    const codesLinks = await page.$$eval('.coupon_info ul .coupon_detail .overs.c_title', el => el.map(li => li.getAttribute("onclick")))
    const removePunc  = codesLinks.map(li => li?.replace(/[\(\)'";]/g, ''))
    const finalLinks = removePunc.map(li => li?.split('code')[1])
    const filterLinks = finalLinks.filter(li => li !== undefined)
    for (const link of filterLinks) {
      await page.goto(`${url}/show-code/?go-data=${link}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector('.cont')
      const coupon = elementHandle && await elementHandle.evaluate(() => {
        const couponCode = (document.querySelector(".code_box .code_num #popcode") as HTMLElement)?.innerText
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

// no.36 https//save.reviews.com-------------------------------------------------------------------------------------------------------------
app.get('/save.reviews', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.save.reviews/coupons/paradisefibers.com' 
    await page.goto(targetUrl)
    const codes = await page.$$eval('.discountbox .discountbox-main .moredetail-main .getcode-btn .button-text', el => el.map(code => code.getAttribute('data-code')))
     console.log("🚀 ~ file: app.ts:1152 ~ app.get ~ codes:", codes)
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})

// no.37 https//fyvor.com-------------------------------------------------------------------------------------------------------------
app.get('/fyvor', (req: Request, res: Response, next: NextFunction) => {
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
    const targetUrl = 'https://www.fyvor.com/coupons/paradise-fibers/' 
    await page.goto(targetUrl)
    const ids = await page.$$eval('.coupon_infor .ds_content .ds_cou_right .btn a', el => el.map(code => code.getAttribute('data-cid')))
    for (const id of ids) {
      await page.goto(`${targetUrl}?promoid=${id}`, {
        waitUntil: 'networkidle0'
      })
      // console.log(page.url());
      const elementHandle = await page.waitForSelector('#votedialog')
      const coupon = elementHandle && await page.evaluate(() => {
        const couponCode = document.querySelector('#couponcode_dialog #copy')?.getAttribute('data-clipboard-text')
        return {
          couponCode
        }
      })
      if (coupon?.couponCode) coupons.push(coupon)
    }
    console.log(coupons);
     await browser.close()
    console.log(`All done, check the result. ✨`)
  })

  res.send('Hello World!')
})


export default app