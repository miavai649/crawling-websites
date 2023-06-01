import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    shop: {
      type: String
    },
    plan: {
      type: Object
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isAppInstalled: {
      type: Boolean,
      default: true
    },
    billingOn: {
      type: Date,
      default: new Date('2099-01-01')
    },
  },
  {
    timestamps: true
  }
)

const Plan = mongoose.model('Plans', planSchema)

export default Plan
