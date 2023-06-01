import mongoose from "mongoose";

const crawlUrlsSchema = new mongoose.Schema({
  target_urls: [{
    end_point: {
      type: String,
    },
    url: {
      type: String,
    },
    target_Url: {
      type: String
    },
  }],
  shop: {
    type: String,
  },
})

const CrawlUrls = mongoose.model('CrawlUrls', crawlUrlsSchema)

export default CrawlUrls