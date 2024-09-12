import express from 'express';
import { placeOrder } from '../controllers/orderControllers';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.post("/place",authMiddleware, placeOrder)
export default router