import express from "express";
import bodyParser from "body-parser";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import tourRoutes from "./routes/tours.js";
import userRoutes from "./routes/users.js";
import reviewRoutes from "./routes/reviews.js";
import bookingRoutes from "./routes/booking.js";
import hotelRoutes from "./routes/hotel.js";
import blogRoutes from "./routes/blog.js"

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

//databse connection
mongoose.set("strictQuery", false);
const connectT = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error in connecting to MongoDB");
  }
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/hotel", hotelRoutes);
app.use("/api/v1/blog", blogRoutes);

app.listen(port, () => {
  connectT();
  console.log(`Server running on port: ${port}`);
});
