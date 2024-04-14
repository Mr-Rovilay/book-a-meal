import { IoIosLogIn } from "react-icons/io";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import Model from "./Model";
import Profile from "./Profile";
import { UserContext } from "../router/Router";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const [searchBox, setSearchBox] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const {
    userAuth,
    userAuth: { access_token, profile_img, username },
  } = useContext(UserContext);
  const [cart, refetch] = useCart();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (username) {
      refetch();
    }
  }, [username, refetch]);

  const navItems = (
    <>
      <li className="text-xl transition duration-200 hover:text-green hover:ease-in-out focus:text-green/80 active:text-green/80 motion-reduce:transition-none">
        <a href="/">Home</a>
      </li>

      <div className="dropdown dropdown-hover cursor-pointer">
        <summary className="text-xl mt-2 px-4 transition duration-200 hover:text-green hover:ease-in-out focus:text-green/80 active:text-green/80 motion-reduce:transition-none">
          <a>Menu</a>
        </summary>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 bg-white text-black rounded-box w-52 text-xl"
        >
          <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
            <a href="/menu">All</a>
          </li>

          <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
            <a>Pizza</a>
          </li>
          <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
            <a>Swallow</a>
          </li>
        </ul>
      </div>

      <div className="dropdown dropdown-hover cursor-pointer">
        <summary className="text-xl mt-2 px-4 transition duration-200 hover:text-green hover:ease-in-out focus:text-green/80 active:text-green/80 motion-reduce:transition-none">
          Services
        </summary>
        <ul
          tabIndex={0}
          className="md:dropdown-content z-[1] menu p-2 bg-white text-black rounded-box w-52 text-xl"
        >
          <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
            <a href="/order">Order</a>
          </li>
          <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
            <a>Bookings</a>
          </li>
          <li className="mt-3 hover:text-black hover:bg-grey opacity-75 border-grey focus:bg-transparent hover:bg-opacity-80">
            <a href="order">Order Tracking</a>
          </li>
        </ul>
      </div>
    </>
  );
  return (
    <header className="mx-auto fixed bg-white top-0 left-0 right-0 transition-all duration-300 ease-in-out">
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
                className="h-6 w-6 "
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
              className="bg-white menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-dark-grey rounded-box w-60 gap-4"
            >
              {navItems}
            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-2xl text-green pl-0">
            Meal
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end gap-2">
          <button
            className="bg-grey w-12 h-12 rounded-full flex items-center justify-center text-dark-grey"
            onClick={() => setSearchBox((currentVal) => !currentVal)}
          >
            <i className="fi fi-rr-search text-1xl"></i>
          </button>
          <div
            className={
              "absolute bg-white w-full left-0 top-full mt-0 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto  md:show " +
              (searchBox ? "show" : "hide")
            }
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-auto bg-grey p-3 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
            />
            <i className="fi fi-br-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
          </div>

          <label
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle mr-3 lg:flex items-center justify-center"
          >
            <Link to="/cart-page" className="flex items-center gap-4">
              <div className="relative flex items-center justify-center ">
                <BsCart className="fill w-6 h-6 md:w-5 md:h-5" />
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red flex items-center justify-center">
                  <p className="text-white">{cart.length || 0}</p>
                </div>
              </div>
            </Link>
          </label>

          {access_token ? (
            <>
              <Profile />
            </>
          ) : (
            <>
              <button
                className="btn bg-green border-green text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                <IoIosLogIn className="text-2xl" />
                Login
              </button>
              <Model />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
