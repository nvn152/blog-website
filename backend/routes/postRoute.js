import express from "express";
import { authVerification } from "../middlewares/authVerification.js";
import { getPosts, createPost } from "../controllers/postController.js";

const router = express.Router();

router.post("/createPost", authVerification, createPost);
router.get("/getposts", getPosts);

export default router;
