import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useCart from "../hooks/useCart";
import { useEffect } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const DeliveryInfo = () => {
  const [cart, setCart] = useCart();

  // Use useEffect to log the cart items for debugging
  useEffect(() => {
    console.log("Cart items:", cart);
  }, [cart]);

  // Calculate total price
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = parseFloat(cartTotal.toFixed(2));

  // Use useEffect to log the total price for debugging
  useEffect(() => {
    console.log("Total Price:", totalPrice);
  }, [totalPrice]);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default DeliveryInfo;
