import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../components/Button";
import { FaPaypal } from "react-icons/fa";

const CheckoutForm = () => {
  // const stripe = useStripe();
  // const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8 capitalize">
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: N{}</p>
        <p>Number of Items: {}</p>
        <p>Address:</p>
      </div>
      <div className="md:-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl px-4 py-10">
        <h4 className="text-lg font-semibold ">Process your payment</h4>
        <h5 className="font-medium">credit/debit card</h5>
        {/* <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  width:100%;
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
        </form> */}
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="btn btn-sm mt-5 bg-green border border-green text-white w-full"
          >
            pay
          </button>
        </form>

        <hr />
        <div className="mt-5 w-full">
          <Button text={"pay with paypal"} icon={<FaPaypal />} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
