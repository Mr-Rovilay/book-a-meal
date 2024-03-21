import { IoIosLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import Button from "./Button";
import { useEffect, useState } from "react";
import Model from "./Model";

const Navbar = ({ text, icon }) => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li className="font-bold text-xl">
        <a href="/">Home</a>
      </li>
      <li tabIndex={0} className="text-xl">
        <details>
          <summary className="font-bold text-xl">Menu</summary>
          <ul className="p-2 bg-white text-black">
            <li>
              <a href="/menu">All</a>
            </li>
            <li>
              <a>Pizza</a>
            </li>
            <li>
              <a>Swallow</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0} className="text-xl">
        <details>
          <summary className="font-bold text-xl">Services</summary>
          <ul className="p-2 bg-white text-black">
            <li>
              <a>Online Order</a>
            </li>
            <li>
              <a>Bookings</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li className="font-bold text-xl">
        <a>Offers</a>
      </li>
    </>
  );
  return (
    <header className="mx-w-screen-2xl w-full mx-auto fixed bg-white top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div
        className={`navbar xl:px-32 py-4 ${
          isSticky ? "shadow-md  transition-all duration-300 ease-in-out" : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="bg-white menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-dark-grey rounded-box w-60"
            >
              {navItems}
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl text-green pl-0">Meal</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle mr-3 lg:flex hidden items-center justify-center "
          >
            <Link to="/cartpage" className="flex items-center gap-4">
              <div className="relative flex items-center justify-center">
                <BsCart className="fill w-8 h-8 md:w-5 md:h-5" />
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red flex items-center justify-center">
                  <p className="text-white font-semibold">6</p>
                </div>
              </div>
            </Link>
          </div>
          <button
            className="btn bg-green border-green text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <IoIosLogIn className="text-2xl" />
            Login
          </button>
          <Model />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
