import express from "express";
import stripeControllers from "../controllers/stripeControllers.js";
const router = express();

router.post("/", stripeControllers.createPayment);
export default router;
