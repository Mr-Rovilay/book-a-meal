import express from 'express';
import { getUserOrders, listAllOrders, placeOrder, updateStatus, verifyPayment } from '../controllers/orderControllers.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post("/place",authMiddleware, placeOrder)
router.post("/verify", verifyPayment)
router.post("/user-orders", authMiddleware, getUserOrders)
router.get("/list",listAllOrders)
router.post("/status",updateStatus)
export default router