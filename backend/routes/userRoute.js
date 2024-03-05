import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
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
router.get("/getusers", authVerification, getUsers);
router.get(`/getuser/:userId`, getUser);

export default router;
