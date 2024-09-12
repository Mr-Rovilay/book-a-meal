import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

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

    // Create line items for Stripe checkout
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert price to cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charge to line items
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100, // $2 delivery charge in cents
      },
      quantity: 1,
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
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
