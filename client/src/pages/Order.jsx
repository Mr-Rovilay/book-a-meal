import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate()
  const { cartItems, getTotalCartAmount, all_products, url, token } =
    useContext(ShopContext);

  const totalAmount = getTotalCartAmount();
  const shippingFee = totalAmount > 0 ? 5 : 0;
  const [loading, setLoading] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let orderItems = [];
      all_products.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });
     // console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartAmount() + shippingFee,
      };
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Order error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(!token){
      navigate("/")
    } else if(getTotalCartAmount()===0){
      navigate("/cart") 
    }
  }, [token])

  return (
    <div className="max-padd-container py-28 xl:py-32">
      <form
        onSubmit={placeOrder}
        className="flex flex-col gap-20 xx:flex-row xl:gap-28"
      >
        <div className="flex flex-col flex-1 gap-3 text-[98%]">
          <h3 className="mb-4 text-xl font-semibold">Delivery Info</h3>
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-1/2 p-2 pl-3 rounded-sm outline-none ring-1 ring-slate-900/15"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-1/2 p-2 pl-3 rounded-sm outline-none ring-1 ring-slate-900/15"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 pl-3 rounded-sm outline-none ring-1 ring-slate-900/15"
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-2 pl-3 rounded-sm outline-none ring-1 ring-slate-900/15"
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleInputChange}
            required
            className="w-full p-2 pl-3 rounded-sm outline-none ring-1 ring-slate-900/15"
          />
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-1/2 p-2 pl-3 rounded-sm outline-none ring-1 ring-slate-900/15"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="w-1/2 p-2 pl-3 rounded-sm outline-none ring-1 ring-slate-900/15"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              name="zipcode"
              placeholder="Zip Code"
              value={formData.zipcode}
              onChange={handleInputChange}
              required
              className="w-1/2 p-2 pl-3 rounded-sm outline-none ring-1 ring-slate-900/15"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-1/2 p-2 pl-3 rounded-sm outline-none ring-1 ring-slate-900/15"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="py-5">
            <h4 className="mb-4 text-xl font-semibold">Summary</h4>
            <div className="flex justify-between mb-2">
              <h4 className="text-lg">SubTotal:</h4>
              <h4 className="text-lg">${totalAmount.toFixed(2)}</h4>
            </div>
            <hr className="mb-2" />
            <div className="flex justify-between mb-2">
              <h4 className="text-lg">Shipping Fee:</h4>
              <h4 className="text-lg">${shippingFee}</h4>
            </div>
            <hr className="mb-2" />
            <div className="flex justify-between text-lg font-bold">
              <h4>Total:</h4>
              <h4>${(totalAmount + shippingFee).toFixed(2)}</h4>
            </div>

            <button
  type="submit"
  disabled={loading}
  className={`px-4 py-2 mt-4 text-white rounded cursor-pointer w-52 bg-secondary ${loading ? 'opacity-50' : ''}`}
>
  {loading ? 'Processing...' : 'Checkout'}
</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
