import express from "express";
import profileControllers from "../controllers/profileControllers.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express();

router.get("/get-upload-url", profileControllers.uploadUrl);
router.post(
  "/update-profile-img",
  verifyJWT,
  profileControllers.updateProfileUrl
);
router.post("/get-profile", profileControllers.getProfile);
router.post("/update-profile", verifyJWT, profileControllers.updateProfile);
export default router;
