import { Link } from "react-router-dom";
import profile from "/assets/team_member_3.png";
import Button from "../components/Button";

const Order = () => {
  return (
    <div className="section-container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className="section-container">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
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
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white rounded-sm capitalize text-xl">
                <tr>
                  <th>#</th>
                  <th>order data</th>
                  <th>transitionId</th>
                  <th>price</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>created at</td>
                  <td className="font-medium">transitionId</td>
                  <td>price</td>
                  <td>status</td>
                  <td>
                    <Link
                      to={"/contact"}
                      className="btn btn-sm border-none text-red bg-transparent"
                    >
                      contact
                    </Link>
                  </td>
                </tr>
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
        <hr />
      </div>

      <div className="text-center mt-20">
        <p>Cart is empty. Please add products.</p>
        <div className="flex items-center justify-center mt-4">
          <Link to="/menu">
            <Button text={"back to menu"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Order;
