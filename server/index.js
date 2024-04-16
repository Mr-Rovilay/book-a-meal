import express from "express";
import "./db/db.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import menuRoute from "./routes/menuRoute.js";
import cartRoute from "./routes/cartRoute.js";
import userRoute from "./routes/userRoute.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import verifyJWT from "./middleware/verifyJWT.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.SECRET_ACCESS_KEY, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

// import route
app.use("/router", authRoute);
app.use("/menu", menuRoute);
app.use("/carts", cartRoute);
app.use("/users", userRoute);

// app.post("/create-payment-intent", async (req, res) => {
//   const { price } = req.body;
//   const amount = price * 100;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount,
//     currency: "usd",

//     payment_method_types: ["card"],
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

app.post("/create-payment-intent", async (req, res) => {
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
});

app.get("/", (req, res) => {
  res.send("OK...my message");
});

app.listen(process.env.PORT, () =>
  console.log("server listening on port " + process.env.PORT)
);
