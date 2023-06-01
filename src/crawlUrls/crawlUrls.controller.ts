import { NextFunction, Request, Response } from "express";
import CrawlUrls from "./crawlUrls.schema";

export const CrawlUrlsPost = async (req: Request, res: Response, next: NextFunction) => {
  const newTargetUrls = new CrawlUrls(req.body)
  try {
    const data = await newTargetUrls.save()
    res.status(200).json({
      result: data
    })
  } catch (error) {
    res.status(500).json({
        error: `There wan an error! ${error.message}`
      })    
  }
}

export const CrawlUrlUpdate =async (req:Request, res:Response, next:NextFunction) => {
  const filter = {shop: req.params.shop}
  const update = req.body

  try {
    const data = await CrawlUrls.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    })
    res.status(200).json({
      result: data
    })
  } catch (error) {
    res.status(500).json({
      error: `There was an error! ${error.message}`
    })
  }
}
