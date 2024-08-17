import express from "express";
import {
  createBooking,
  getAllBooking,
  updatedBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/pending", getAllpendingBookings);
// router.get("/ongoing", getAllOngoingBookings);
// router.get("/comleted", getAllComletedBookings);
// router.get("/getBook", getSingleBooking);
router.post("/", createBooking);
// router.get("/:id", verifyUser, getBooking);
router.get("/", getAllBooking);
router.post("/update", updatedBooking);
router.post("/delete/:id", deleteBooking);

export default router;
