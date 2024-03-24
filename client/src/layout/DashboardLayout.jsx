import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Login from "../components/Login";

const sharedLinks = (
  <>
    <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
      <Link to="/menu">
        <FaCartShopping /> Menu
      </Link>
    </li>
    <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
      <Link to="/menu">
        <FaLocationArrow /> Orders Tracking
      </Link>
    </li>
    <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
      <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
        <FaRegUser /> Logout
      </button>
    </li>
  </>
);

const DashboardLayout = () => {
  const isAdmin = true;
  //
  return (
    <div className="">
      {isAdmin ? (
        <div className="drawer  sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary bg-green text-white border border-green drawer-button lg:hidden "
              >
                <MdDashboardCustomize />
              </label>
            </div>
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full text-base-content bg-white">
              {/* Sidebar content here */}
              <li className="">
                <Link to="/dashboard" className="flex justify-start mb-3">
                  <h1>
                    <a
                      href="/"
                      className="btn btn-ghost text-2xl text-green pl-0"
                    >
                      Meal
                    </a>
                  </h1>
                  <span className="badge badge-primary bg-green text-white border border-green py-2">
                    admin
                  </span>
                </Link>
              </li>
              <hr />
              <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
                <Link to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
                <Link to="/dashboard">
                  <FaShoppingBag /> Manage Bookings
                </Link>
              </li>
              <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
                <Link to="/dashboard/add-menu">
                  <FaPlusCircle />
                  Add Menu
                </Link>
              </li>
              <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
                <Link to="/dashboard/manage-items">
                  <FaEdit /> Manage Items
                </Link>
              </li>
              <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
                <Link to="/dashboard/users">
                  <FaUser /> All Users
                </Link>
              </li>

              <hr />

              {/* shared nav links */}
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : (
        <Login />
      )}

      <div className="h-screen flex justify-center items-center">
        <Link to="/">
          <button className="btn bg-green text-white">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardLayout;
