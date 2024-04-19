import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../router/Router";
import axios from "axios";

const Order = () => {
  const {
    userAuth,
    userAuth: { access_token },
  } = useContext(UserContext);
  console.log(access_token);

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders", userAuth?.email],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_DOMAIN}/payments?email=${
            userAuth?.email
          }`
        );

        return res.json();
      } catch (error) {
        throw new Error("Failed to fetch orders");
      }
    },
    enabled: !!userAuth.email,
  });
  console.log(userAuth?.email);
  console.log(orders);

  return (
    <div className="section-container mx-auto xl:px-24 px-4">
      <div className="section-container">
        <div className="py-28 flex flex-col items-center justify-center">
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug capitalize">
              Track All your <span className="text-green">orders</span>
            </h2>
          </div>
        </div>
      </div>

      <div>
        <div className="">
          <div className="overflow-x-auto">
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error fetching orders</p>
            ) : (
              <table className="table">
                <thead className="bg-green text-white rounded-sm capitalize text-xl">
                  <tr>
                    <th>#</th>
                    <th>transitionId</th>
                    <th>price</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td className="font-medium">{order.transitionId}</td>
                      <td>{order.price}</td>
                      <td>{order.status}</td>
                      <td>
                        <Link
                          to={`/contact/${order._id}`}
                          className="btn btn-sm border-none text-red bg-transparent"
                        >
                          Contact
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
