import express, { Application } from 'express'
import cors from 'cors'
import crawlRouter from './crawler/crawler.router'
import EndPointRouter from "./endpoint/endpoint.router"
import StoresRouter from './stores/stores.router'
import TargetURLs from './crawlUrls/crawlUrls.router'


const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/crawl', crawlRouter)
app.use('/api/endpoint', EndPointRouter)
app.use('/api/stores', StoresRouter)
app.use('/api/target_urls', TargetURLs)
export default app