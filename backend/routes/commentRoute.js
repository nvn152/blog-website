import express from "express";
import {
  createComment,
  getComments,
  likeComment,
} from "../controllers/commentController.js";
import { authVerification } from "../middlewares/authVerification.js";

const router = express.Router();

router.post("/create", authVerification, createComment);
router.get("/getcomments/:postId", getComments);
router.put("/likecomment/:commentId", authVerification, likeComment);

export default router;
