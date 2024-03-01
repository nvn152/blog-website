import express from "express";
import { authVerification } from "../middlewares/authVerification.js";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/createPost", authVerification, createPost);
router.get("/getposts", getPosts);
router.delete("/deletePost/:postId/:userId", authVerification, deletePost);
router.put("/updatePost/:postId/:userId", authVerification, updatePost);

export default router;
