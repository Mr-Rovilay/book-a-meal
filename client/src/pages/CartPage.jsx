import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import profile from "/assets/team_member_3.png";
import Swal from "sweetalert2";
import Button from "../components/Button";

const CartPage = () => {
  const user = true;
  return (
    <div className="section-container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className="section-container">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug text-green">
              Items Added to The<span className="text-green"> Cart</span>
            </h2>
          </div>
        </div>
      </div>
      {/* cart table */}
      <div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={profile}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">name</td>
                  <td>
                    <button className="btn btn-xs">-</button>
                    <input
                      type="number"
                      value={"quantity"}
                      className="w-10 mx-2 text-center overflow-hidden appearance-none"
                    />
                    <button className="btn btn-xs">+</button>
                  </td>
                  <td>$20</td>
                  <td>
                    <button className="btn btn-sm border-none text-red bg-transparent">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Customer Details</h3>
            <p>Name: {user?.displayName || "None"}</p>
            <p>Email: {user?.email}</p>
            <p>
              User_id: <span className="text-sm">{user?.uid}</span>
            </p>
          </div>
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Shopping Details</h3>
            <p>Total Items: 2</p>
            <p>
              Total Price: <span id="total-price">$2</span>
            </p>
            <Button text={"proceed to checkout"} />
          </div>
        </div>
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

export default CartPage;
