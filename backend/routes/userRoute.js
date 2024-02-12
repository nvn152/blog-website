import express from "express";
import { deleteUser, test, update } from "../controllers/userController.js";
import { authVerification } from "../middlewares/authVerification.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:id", authVerification, update);
router.delete("/delete/:id", authVerification, deleteUser);

export default router;
