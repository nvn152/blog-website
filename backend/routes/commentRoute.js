import express from "express";
import {
  createComment,
  editcomment,
  getComments,
  likeComment,
} from "../controllers/commentController.js";
import { authVerification } from "../middlewares/authVerification.js";

const router = express.Router();

router.post("/create", authVerification, createComment);
router.get("/getcomments/:postId", getComments);
router.put("/likecomment/:commentId", authVerification, likeComment);
router.put("/editcomment/:commentId", authVerification, editcomment);

export default router;
