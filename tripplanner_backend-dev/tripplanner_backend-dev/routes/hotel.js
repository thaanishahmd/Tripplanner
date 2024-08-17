import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getSingleHotel,
  getAllHotels,
  getHotelLatest
} from "../controllers/hotelController.js";
const router = express.Router();

import { verifyToken } from "../utils/verifyToken.js";
router.get("/single/:id", getSingleHotel);

router.post("/",verifyToken, createHotel);

router.delete("/:id",verifyToken, deleteHotel);

router.put("/update/:id",verifyToken, updateHotel);

router.get("/", getAllHotels);

router.get("/latest", getHotelLatest);



export default router;
