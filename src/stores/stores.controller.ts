import { NextFunction, Request, Response } from 'express'
import Plan from './stores.schema'
import CrawlUrls from '../crawlUrls/crawlUrls.schema'
import mongoose from 'mongoose'
import { Schema } from 'mongoose'

export const GetAllPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, shopId } = req.query
    const limit = 10
    const query: any = {
      isActive: true
    }
    if(shopId) query._id = new mongoose.Types.ObjectId(shopId)

    // console.log({page, skip: (Number(page)-1)*limit})
    
    const data = await Plan.aggregate([
      {$match: query},
      {
        $lookup: {
          from: 'crawlurls', //or Races.collection.name
          localField: "shop",
          foreignField: "shop",
          as: "targetUrls"
        }
      },
      {
        $lookup: {
          from: 'shops', //or Races.collection.name
          localField: "shop",
          foreignField: "shop",
          as: "shopDetails"
        }
      },
      {
        $sort: {createdAt: -1}
      },
      {
        $skip: (Number(page) - 1) * limit,
      },
      {
        $limit: limit,
      }
    ])

    // const data = await Plan.aggregate.lookup({
    //   from: CrawlUrls, //or Races.collection.name
    //   localField: "shop",
    //   foreignField: "shop",
    //   as: "targetUrls"
    // }, {
    //   $limit: limit * 1
    // }, {
    //   $skip: (page - 1) * limit
    // }, {
    //   $sort: { createdAt: -1 }
    // })
    
    const count = await Plan.countDocuments({
      isActive: true
    })
    res.status(200).json({
      result: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      message: 'Success'
    })
  } catch (error) {
    res.status(500).json({
      error: `there was an error ${error.message}`
    })
  }
}
