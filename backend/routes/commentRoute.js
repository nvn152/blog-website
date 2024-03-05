import express from "express";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";
import { authVerification } from "../middlewares/authVerification.js";

const router = express.Router();

router.post("/create", authVerification, createComment);
router.get("/getcomments/:postId", getComments);

export default router;
