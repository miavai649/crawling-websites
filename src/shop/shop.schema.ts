import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    shop: {
      type: String
    },
    lastScrapped: {
      type: Date
    },
    crawlCredit: {
      type: Number,
      default: 1
    },
    crawlInterval: {
      type: Number,
      default: 30
    },
    usedCrawlCredit: {
      type: Number
    },
    alias: {
      type: [String]
    },
    possibleUrls: {
      type: [Object]
    },
    plan: {
      type: mongoose.Types.ObjectId,
      ref: 'Plan'
    }
  },
  {
    timestamps: true
  }
)

const Shop = mongoose.model("Shop", shopSchema);

export default Shop