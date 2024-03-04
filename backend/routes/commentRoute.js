import express from "express";
import { createComment } from "../controllers/commentController.js";
import { authVerification } from "../middlewares/authVerification.js";

const router = express.Router();

router.post("/create", authVerification, createComment);

export default router;
