import express from "express";
import {
  deleteUser,
  signout,
  test,
  update,
} from "../controllers/userController.js";
import { authVerification } from "../middlewares/authVerification.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:id", authVerification, update);
router.delete("/delete/:id", authVerification, deleteUser);
router.post("/signout", signout);

export default router;
