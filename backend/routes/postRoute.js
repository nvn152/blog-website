import express from "express";
import { authVerification } from "../middlewares/authVerification.js";
import createPost from "../controllers/postController.js";

const router = express.Router();

router.post("/createPost", authVerification, createPost);

export default router;
