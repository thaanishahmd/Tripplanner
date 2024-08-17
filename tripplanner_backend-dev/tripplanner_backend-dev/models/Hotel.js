import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  roomCount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export default mongoose.model("Hotel", hotelSchema);
