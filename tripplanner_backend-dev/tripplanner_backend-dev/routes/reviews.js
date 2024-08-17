import express from "express";
import {
  createReview,
  deleteReview,
  updatedReview,
  allReviews,
  hotelReviews,
  userReviews,
  oneReview
} from "../controllers/reviewController.js";
const router = express.Router();


router.get("/getone/:id", oneReview);
router.get("/getall", allReviews);
router.get("/getuse/:id", userReviews);
router.get("/gethot/:id", hotelReviews);
router.put("/update/:id", updatedReview);
router.delete("/delete/:id", deleteReview);
router.post("/add", createReview);

export default router;
