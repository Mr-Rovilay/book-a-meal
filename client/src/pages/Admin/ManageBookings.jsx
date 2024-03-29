import React from "react";
import { FaTrashAlt, FaUser, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

const ManageBookings = () => {
  const items = true;
  const handleConfirm = async (items) => {};
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Orders</h5>
        <h5>Total Orders: {items.length}</h5>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rounded-lg text-xl">
              <tr>
                <th>#</th>
                <th>Users</th>
                <th>Transition Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>confirm Orders</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Email</td>
                <td>TransitionId</td>
                <td>$</td>
                <td>status</td>
                <td className="text-center">
                  {items.status === "confirmed" ? (
                    "done"
                  ) : (
                    <button
                      onClick={() => handleConfirm(items)}
                      className="btn btn-xs  bg-green text-white"
                    >
                      <GiConfirmed />
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-xs bg-red text-white">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
