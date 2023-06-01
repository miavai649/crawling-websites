import {Router } from 'express'
const router = Router()
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { fetchBrokescholar, fetchClothingrac, fetchCouponBind, fetchCouponCause, fetchCouponKirin, fetchCouponSeeker, fetchCouponToaster, fetchCouponbirds,  fetchCouponsSlickDeals, fetchDealDrop, fetchDealScove, fetchDealSpotr, fetchDealrated, fetchDiscoutReactor, fetchDontpayfull, fetchEmucoupon, fetchEpicsavers, fetchFyvor,  fetchGogetDeals, fetchGreenPromoCode, fetchHotDeals, fetchMoneySaveMe, fetchOffers, fetchOzsavingSpro, fetchPrintFresh, fetchPrmdeal, fetchPromopro, fetchRakuten, fetchRefermatei, fetchRetailMenot, fetchSaveReviews, fetchSavingArena, fetchSociableLabs, fetchThephuketnews, fetchTop1PromoCodes, fetchUltimateCoupons, fetchWativ, fetchWethrift } from './crawler.controller'

// no.1  http://wativ.com 
router.post('/wativ', fetchWativ)

// no.2 https://brokescholar
router.post('/brokescholar', fetchBrokescholar)

// no.3 https//couponcause.com
router.post('/couponcause', fetchCouponCause)

// no.4 https//coupons.slickdeals.com
router.post('/coupons-slickdeals', fetchCouponsSlickDeals)

// no.5 https//couponseeker.com
router.post('/couponseeker', fetchCouponSeeker)

// no.6 https//coupontoaster.com
router.post('/coupontoaster', fetchCouponToaster)

// no.7 https//deala.com-------------------------------------------------------------------------------------------------------------------
// router.get('/deala', fetchDeala)

// no.8 https//dealrated.com-------------------------------------------------------------------------------------------------------------------
router.post('/dealrated', fetchDealrated)

// n0.9 https//dealspotr.com
router.post('/dealspotr', fetchDealSpotr)

// no.10 https//epicsavers.com
router.post('/epicsavers', fetchEpicsavers)

// no.11 https//givingassistant.com---------------------------------------------------------------------------------------------------------
// router.get('/givingassistant', fetchGivingGassistant)

// no.12 https//gogetdeals.com
router.post('/gogetdeals', fetchGogetDeals)

// no.13 https//printfresh.knoji.com
router.post('/printfresh-knoji', fetchPrintFresh)

// no.14 https//refermatei.com
router.post('/refermate', fetchRefermatei)

// no.15 https//couponbirds.com
router.post('/couponbirds', fetchCouponbirds)

// no.16 https//couponchief.com-------------------------------------------------------------------------------------------------------------
// router.get('/couponchief', fetchCouponchief)

// no.17 https//couponcode.com-------------------------------------------------------------------------------------------------------------
// router.get('/couponcode', fetchCouponCode)

// no.18 https//couponkirin.com-------------------------------------------------------------------------------------------------------------
router.post('/couponkirin', fetchCouponKirin)

// no.19 https//dealdrop.com-------------------------------------------------------------------------------------------------------------
router.post('/dealdrop', fetchDealDrop)

// no.20 https//discountreactor.com-------------------------------------------------------------------------------------------------------------
router.post('/discountreactor', fetchDiscoutReactor)

// no.21 https//dontpayfull.com-------------------------------------------------------------------------------------------------------------
router.post('/dontpayfull', fetchDontpayfull)

// no.22 https//emucoupon.com-------------------------------------------------------------------------------------------------------------
router.post('/emucoupon', fetchEmucoupon)

// no.23 https//greenpromocode.com-------------------------------------------------------------------------------------------------------------
router.post('/greenpromocode', fetchGreenPromoCode)

// no.24 https//hotdeals.com-------------------------------------------------------------------------------------------------------------
router.post('/hotdeals', fetchHotDeals)

// no.25 https//moneysaveme.com-------------------------------------------------------------------------------------------------------------
router.post('/moneysaveme', fetchMoneySaveMe)

// no.26 https//offers.com-------------------------------------------------------------------------------------------------------------
router.post('/offers', fetchOffers)

// no.27 https//prmdeal.com-------------------------------------------------------------------------------------------------------------
router.post('/prmdeal', fetchPrmdeal)

// no.28 https//promopro.com-------------------------------------------------------------------------------------------------------------
router.post('/promopro', fetchPromopro)

// no.29 https//savingarena.com-------------------------------------------------------------------------------------------------------------
router.post('/savingarena', fetchSavingArena)

// no.30 https//sociablelabs.com-------------------------------------------------------------------------------------------------------------
router.post('/sociablelabs', fetchSociableLabs)

// no.31 https//thephuketnews.com-------------------------------------------------------------------------------------------------------------
router.post('/thephuketnews', fetchThephuketnews)

// no.32 https//wethrift.com-------------------------------------------------------------------------------------------------------------
router.post('/wethrift', fetchWethrift)

// no.33 https//retailmenot.com-------------------------------------------------------------------------------------------------------------
router.post('/retailmenot', fetchRetailMenot)

// no.34 https//rakuten.com-------------------------------------------------------------------------------------------------------------
router.post('/rakuten', fetchRakuten)

// no.35 https//dealscove.com-------------------------------------------------------------------------------------------------------------
router.post('/dealscove', fetchDealScove)

// no.36 https//save.reviews.com-------------------------------------------------------------------------------------------------------------
router.post('/save-reviews', fetchSaveReviews)

// no.37 https//fyvor.com-------------------------------------------------------------------------------------------------------------
router.post('/fyvor', fetchFyvor)

// no.38 https//clothingrac.com-------------------------------------------------------------------------------------------------------------
router.post('/clothingrac', fetchClothingrac)

// no.39 https//ultimatecoupons.com-------------------------------------------------------------------------------------------------------------
router.post('/ultimatecoupons', fetchUltimateCoupons)

// no.40 https//ozsavingspro.com-------------------------------------------------------------------------------------------------------------
router.post('/ozsavingspro', fetchOzsavingSpro)

// no.41 https//top1promocodes.com-------------------------------------------------------------------------------------------------------------
router.post('/top1promocodes', fetchTop1PromoCodes)

// no.42 https//couponbind.com-------------------------------------------------------------------------------------------------------------
router.post('/couponbind', fetchCouponBind)


export default router