import mongoose from 'mongoose'

const endPointSchema = new mongoose.Schema({
  end_point: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

const EndPoint = mongoose.model('EndPoint', endPointSchema)

export default EndPoint
