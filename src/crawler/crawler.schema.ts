import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    scrapUrl: {
      type: String
    },
    shop: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon
