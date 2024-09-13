import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBox } from "react-icons/fa";
import { format } from 'date-fns';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [url]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.data) {
        setOrders(response.data.data);
        setError(null); // Reset error if successful
      }
    } catch (err) {
      setError('Failed to fetch orders');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, { 
        orderId,
        status
      });
      if (response.data.success) {
        fetchOrders(); // Refresh orders after status update
      }
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  return (
    <div className="box-border w-full p-4 bg-white sm:p-20 rounded-xl">
      <h4 className='uppercase bold-22'>Orders</h4>
      
      {error && <div className="text-red-500">{error}</div>}
      
      <div className="mt-5 overflow-auto">
        <table className='w-full'>
          <thead>
            <tr className='py-12 border border-b border-slate-900/20 text-gray-30 regular-14 sx:regular-16 text-start'>
              <th className="hidden p-1 sm:table-cell">Package</th>
              <th className="p-1">Orders</th>
              <th className="p-1">Price</th>
              <th className="p-1">Item</th>
              <th className="p-1">Date & Time</th>
              <th className="p-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className='p-6 text-left border-b text-gray-50 border-slate-900/20 medium-14'>
                <td className="p-1 sm:table-cell"><FaBox className='text-2xl text-secondary' /></td>
                <td className="p-1">
                  <div className="py-2">
                    <p>
                      {order.items.map((item, index) => (
                        `${item.name} x ${item.quantity}${index === order.items.length - 1 ? '' : ', '}`
                      ))}
                    </p>
                  </div>
                  <hr className="w-1/2" />
                  <div className="">
                    <h5 className="medium-14">
                      {order.address.firstName + " " + order.address.lastName}
                    </h5>
                    <div className="">
                      <p>{order.address.street + ", "}</p>
                      <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + "."}</p>
                    </div>
                  </div>
                  <p>{order.address.phone}</p>
                </td>
                <td className="p-1">${order.amount}</td>
                <td className="p-1 text-center">{order.items.length}</td>
                <td className="p-1">
                  {order.createdAt && format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="p-1">
                  <select
                    className='text-sm outline-none cursor-pointer max-w-20 xl:max-w-36 ring-1 ring-secondary'
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)} // Pass status directly
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
