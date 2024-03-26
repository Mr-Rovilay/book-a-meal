import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthProvider";

const useCart = () => {
  const { user } = true;
  // console.log(user.email)
  const token = localStorage.getItem("access-token");

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:6001/carts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  return [cart, refetch];
};
export default useCart;


import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../components/Button";
import { FaPaypal } from "react-icons/fa";

const CheckoutForm = (price, cart) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8 capitalize">
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: N{}</p>
        <p>Number of Items: {cart.length}</p>
        <p>Address:</p>
      </div>
      <div className="md:-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-10">
        <h4 className="text-lg font-semibold ">Process your payment</h4>
        <h5 className="font-medium">credit/debit card</h5>

        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div type="submit" disabled={!stripe} className="mt-5">
            <Button text="pay" type={"submit"} />
          </div>
        </form>
        <div className="mt-5 text-center">
          <hr />
          <div type="submit" disabled={!stripe} className="mt-5 bg-purple">
            jhb
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useCart from "../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const DeliveryInfo = () => {
  const [cart] = useCart();
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = parseFloat(cartTotal.toFixed(2));
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
};

export default DeliveryInfo;
