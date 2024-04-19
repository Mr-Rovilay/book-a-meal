import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const createPayment = async (req, res) => {
  const { price } = req.body;

  try {
    // Ensure that the price is a valid number
    if (!price || isNaN(price)) {
      return res.status(400).json({ error: "Invalid price" });
    }

    // Convert the price to the smallest currency unit (cents for USD)
    const amount = Math.round(parseFloat(price) * 100);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Send the client secret back to the client
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Failed to create PaymentIntent" });
  }
};

export default { createPayment };
