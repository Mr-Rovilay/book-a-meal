import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext, useEffect } from "react";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true"; // Convert to boolean
  const orderId = searchParams.get("orderId");
  const { url } = useContext(ShopContext);
  const navigate = useNavigate();


  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error.response?.data || error.message);
      navigate("/"); // Fallback in case of error
    }
  };
  

  useEffect(() => {
    verifyPayment();
  }, []); // verifyPayment runs once on component mount

  return (
    <div className="min-h-[60vh] grid">
      <div className="w-24 h-24 border-4 rounded-full place-self-center border-t-secondary animate-spin"></div>
    </div>
  );
};

export default Verify;
