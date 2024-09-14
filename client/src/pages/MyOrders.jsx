import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { FaBox } from "react-icons/fa";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!token) return; // Prevent fetch if no token

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${url}/api/order/user-orders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token, url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pt-20 max-padd-container">
      <h1 className="uppercase bold-24">My Orders</h1>
      {data.length === 0 ? (
        <p className="pt-20 max-padd-container">You have no orders yet.</p>
      ) : (
        <table className="w-full mt-8">
          <thead>
            <tr className="py-12 border border-b border-slate-900/20 text-gray-30 regular-14 sx:regular-16 text-start">
              <th className="hidden p-1 text-left sm:table-cell">Package</th>
              <th className="p-1 text-left">Title</th>
              <th className="p-1 text-left">Price</th>
              <th className="p-1 text-left">Quantity</th>
              <th className="p-1">Status</th>
              <th className="p-1 text-left">Track</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, i) => (
              <tr
                key={i}
                className="p-6 text-left border-b text-gray-50 border-slate-900/20 medium-14"
              >
                <td className="hidden p-1 sm:table-cell">
                  <FaBox className="text-2xl text-secondary" />
                </td>
                <td className="p-1">
                  <p>
                    {order.items.map(
                      (item, index) =>
                        `${item.name} x ${item.quantity}${
                          index === order.items.length - 1 ? "" : ", "
                        }`
                    )}
                  </p>
                </td>
                <td className="p-1">${order.amount}</td>
                <td className="p-1 text-center">{order.items.length}</td>
                <td className="p-1">
                  <p className="flexCenter gap-x-2">
                    <span className="hidden lg:flex">&#x25cf;</span>
                    <b>{order.status}</b>
                  </p>
                </td>
                <td className="p-1">
                  <button
                    onClick={fetchOrders}
                    className="rounded-sm shadow-sm cursor-pointer btn-white hover:bg-secondary"
                  >
                    Track
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
