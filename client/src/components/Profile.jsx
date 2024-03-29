// import React, { useContext } from "react";
// import { AuthContext } from "../contexts/AuthProvider";

const Profile = ({ user }) => {
  return (
    <div>
      <div className="drawer drawer-end z-50 ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar "
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay "
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-white text-base-content text-2xl">
            {/* Sidebar content here */}
            <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
              <a href="/user-profile">Profile</a>
            </li>
            <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
              <a href="/order">Orders</a>
            </li>
            <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
              <a>Setting</a>
            </li>
            <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
              <a href="/dashboard">Dashboard (Admin Only)</a>
            </li>
            <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
              <a className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
