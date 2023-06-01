import { NextFunction, Request, Response} from 'express'
import EndPoint from './endpoint.schema'

export const GetEndPoint = async (req: Request, res: Response, next: NextFunction) => {
  const newEndPoint = new EndPoint(req.body)
  try {
    const data = await newEndPoint.save()
    res.status(200).json({
      message: `new end point inserted on ${new Date()}`,
      result: data
    })
  } catch (error) {
    res.status(500).json({
         error: `There was an error! ${error.message}`
       }) 
  }
}

export const GetAllEndPoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await EndPoint.find().sort({ createdAt: -1 })
    res.status(200).json({
      message: 'Success',
      result: data
    })
  } catch (error) {
    res.status(500).json({
      error: `There are an error ${error.message}`
    })
  }
}

export const UpdateEndPoint = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params
  const endpoint = req.body
  try {
    await EndPoint.findByIdAndUpdate(id, endpoint)    
    res.status(200).json({
      message: `updated at ${new Date()}`
    })
  } catch (error) {
    res.status(500).json({

      error: `There was an error ${error.message}`
    })
  }
}

export const DeleteEndPoint = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params
  try {
    await EndPoint.findByIdAndRemove(id)
    res.status(200).json({
      message: `deleted at ${new Date()}`
    })
  } catch (error) {
    res.status(500).json({
      error: `there was an error ${error.message}`
    })
  }
}