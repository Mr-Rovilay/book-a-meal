import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaRegUser,
  FaUser,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Model from "../components/Model";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLinks = (
  <>
    <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
      <Link to="/menu">
        <FaCartShopping /> Menu
      </Link>
    </li>
    <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
      <Link to="#">
        <FaLocationArrow /> Orders Tracking
      </Link>
    </li>
    <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
      <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white">
        <FaRegUser /> Logout
      </button>
    </li>
  </>
);

const DashboardLayout = () => {
  // const { loading: authLoading } = useAuth();
  // const { isAdmin, isAdminLoading } = useAdmin();
  const isAdmin = true;

  // if (authLoading || isAdminLoading) {
  //   return <div>Loading...</div>;
  // }
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
            <ul className="menu p-4 w-80 min-h-full text-base-content bg-grey text-xl">
              {/* Sidebar content here */}
              <li className="">
                <div className="flex justify-start mb-3">
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
                </div>
              </li>
              <hr />
              <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
                <Link to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
              </li>

              <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
                <Link to="/dashboard/add-menu">
                  <FaPlusCircle />
                  Add Menu
                </Link>
              </li>

              <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
                <Link to="/dashboard/manage-bookings">
                  <FaPlusCircle />
                  Manage Users Bookings
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
        <>
          <button
            className="btn bg-green border-green text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <IoIosLogIn className="text-2xl" />
            Login
          </button>
          <Model />
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
