import express from "express";

import {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.get("twilio-sms/send-otp");
router.post("/logout", logoutUser);
router.route("/profile").put(updateUserProfile);

export default router;
