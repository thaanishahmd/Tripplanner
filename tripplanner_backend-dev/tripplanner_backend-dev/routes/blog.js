import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getAllBlogs,
  getlatest,
} from "../controllers/blogController.js";
const router = express.Router();

import { verifyToken } from "../utils/verifyToken.js";
router.get("/single/:id", getSingleBlog);

router.post("/",verifyToken, createBlog);

router.delete("/:id",verifyToken, deleteBlog);

router.put("/:id",verifyToken, updateBlog);

router.get("/", getAllBlogs);

router.get("/latest", getlatest);

export default router;
