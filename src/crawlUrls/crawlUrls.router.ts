import { Router } from "express";
import { CrawlUrlUpdate, CrawlUrlsPost } from "./crawlUrls.controller";
const router = Router()

router.post('/', CrawlUrlsPost)
router.put('/:shop', CrawlUrlUpdate)

export default router