import express from "express";

import {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/twilio-sms/send-otp", sendOTP);
router.post("/twilio-sms/verify-otp", verifyOTP);
router.get("verify/:token");
router.post("/logout", logoutUser);
router.route("/profile").put(updateUserProfile);

export default router;
