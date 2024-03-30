import Animation from "/src/Animation.json";
import Lottie from "lottie-react";
const PaymentSuccess = () => {
  return (
    <div className="section-container bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-6 md:mx-auto">
        <div className="w-30 h-30">
          <Lottie loop={true} animationData={Animation} />
        </div>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <a
              href="/order"
              className="btn btn-success bg-green border- border-green hover:bg-dark-green text-white"
            >
              Track Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
