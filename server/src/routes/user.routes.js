import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateProfile,
} from "../contollers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/registerUser", registerUser);
router.post("/login", loginUser);

router.post("/updateProfile", verifyAuth, updateProfile);
router.post("/getUser", verifyAuth, getUser);
export default router;
