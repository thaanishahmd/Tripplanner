import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },
    hotelId: {
      type: mongoose.Types.ObjectId,
      ref: "Hotel",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: Date,
      // required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
