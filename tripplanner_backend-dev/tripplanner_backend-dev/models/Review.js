import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    hotelName: {
      type: mongoose.Schema.Types.String,
      ref: "Hotel",
    },
    hotelImage: {
      type: mongoose.Schema.Types.String,
      ref: "Hotel",
    },
    username: {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
    feedbackId: {
      type: String,
      required: true,
          unique: true,
    },
    rating: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: false,
    },
    code: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
