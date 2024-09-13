import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || "https://book-a-meal.onrender.com"; // Ensure frontend URL is environment-configured

  try {
    const { items, amount, address, userId } = req.body;

    // Create a new order
    const newOrder = new Order({
      userId,
      items,
      amount,
      address,
    });

    // Save the order to the database
    await newOrder.save();

    // Clear the user's cart after placing the order
    await User.findByIdAndUpdate(userId, { cartData: {} });

    // Ensure `items` is an array before processing
    const line_items = Array.isArray(items)
      ? items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100, // Convert price to cents
          },
          quantity: item.quantity,
        }))
      : [];

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 500, // $5 delivery charge in cents
      },
      quantity: 1,
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Send the session URL to the client
    res.json({
      success: true,
      message: "Order placed successfully",
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
      error: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  const { orderId, success } = req.body;

  if (!orderId || typeof success === "undefined") {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: orderId and success"
    });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (success === true) {
      order.status = "Payment Confirmed";
      order.payment = true;
      await order.save();

      return res.status(200).json({ success: true, message: "Payment verified", order });
    } else {
      return res.status(400).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({userId:req.body.userId});
    res.json({success:true, data:orders})
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const listAllOrders = async (req,res) => {
  try {
    const orders = await Order.find({});
    res.json({success:true, data:orders})
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } 
}

export const updateStatus = async (req,res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.body.orderId, {status: req.body.status}, {new: true});
    res.json({success:true, message: "status updated"})
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

