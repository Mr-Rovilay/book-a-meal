import express from "express";
import Payment from "../models/Payment.js";
import Carts from "../models/Carts.js";
const router = express();

router.post("/", async (req, res) => {
  const payment = req.body;
  try {
    const paymentRequest = await Payment.create(payment);
    const cartIds = payment.cartItems.map((item) => item._id);
    const deleteCartRequest = await Carts.deleteMany({ _id: { $in: cartIds } });
    res.status(200).json({ paymentRequest, deleteCartRequest });
  } catch (error) {
    console.error("Error saving payment information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  const { email } = req.query;

  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      return res
        .status(400)
        .json({ error: "Forbidden access: email does not match" });
    }
    const orders = await Payment.find({ email }).sort({ createdAt: -1 }).exec();
    res.status(200).json({ data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
