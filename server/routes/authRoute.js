import express from "express";
import authControllers from "../controllers/authControllers.js";
const router = express();

router.post("/signup", authControllers.signUp);
router.post("/signin", authControllers.SignIn);
router.post("/google-auth", authControllers.googleAuth);

export default router;
