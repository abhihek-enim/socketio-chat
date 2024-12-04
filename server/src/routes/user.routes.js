import { Router } from "express";
import {
  getUserByEmail,
  loginUser,
  registerUser,
  updateProfile,
} from "../contollers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.post("/registerUser", registerUser);
router.post("/login", loginUser);

router.post("/getUser", verifyAuth, getUserByEmail);
router
  .route("/updateProfile")
  .post(
    upload.fields([{ name: "profileImage", maxCount: 1 }]),
    verifyAuth,
    updateProfile
  );
export default router;
