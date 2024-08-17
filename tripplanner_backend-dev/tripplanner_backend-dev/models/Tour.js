import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Types.ObjectId,
      ref:'User'
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
    pricePerHead: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    modeOfTransport: {
      type: String,
      // required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
