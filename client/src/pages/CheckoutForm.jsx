import { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../components/Button";
import { FaPaypal } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { UserContext } from "../router/Router";
import toast from "react-hot-toast";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  let { userAuth } = useContext(UserContext);
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth;
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("price is not a number");
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentError(null);
      setPaymentSuccess(paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userAuth?.fullname || "no name",
            email: userAuth?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      toast.success(`Your transitionId is ${paymentIntent.id}`);
      const paymentInfo = {
        email: userAuth.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order Pending",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };
      console.log(paymentInfo);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-16 capitalize">
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: N {price}</p>
        <p>Number of Items: {cart.length}</p>
        <p>Address:</p>
      </div>
      <div className="md:-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl px-4 py-8">
        <h4 className="text-lg font-semibold ">Process your payment</h4>
        <h5 className="font-medium capitalize">credit/debit card</h5>
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
          <div className="mt-5">
            <Button text={"pay"} icon={<FaPaypal />} disabled={!stripe} />
          </div>
        </form>
        {paymentError && <div className="mt-3 text-red">{paymentError}</div>}
        {paymentSuccess && (
          <div className="mt-3 text-green">
            Payment successful!
            <p>Payment ID: {paymentSuccess.id}</p>
          </div>
        )}
        <div className="mt-5 text-center">
          <hr />
          <div className="mt-5">
            <Button
              text={"pay with paypal"}
              icon={<FaPaypal />}
              disabled={!stripe}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
