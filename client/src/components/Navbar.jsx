import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import profile from "/assets/team_member_2.png";
import { Link, Outlet } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import CartIcon from "./CartIcon";
import Button from "./Button";
import UserNavigation from "./UserNavigation";

const Navbar = () => {
  const [dropDown, setDropDown] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);
  const user = false;

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  const showDropDown = () => {
    setDropDown(!dropDown);
  };
  return (
    <>
      <nav className="w-full h-24 flex flex-col justify-center items-center fixed z-20 bg-black  border-b-2 border-b-green">
        <div className="container lg:px-8">
          <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between items-center">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <span className="flex items-center lg:text-5xl text-3xl">
                  <Link
                    to={"/"}
                    className="rounded-full py-1 lg:text-2xl text-3xl outline-none border-none"
                  >
                    <h5 className="text-green font-semibold text-2xl">Meal</h5>
                  </Link>
                </span>
              </div>
            </div>
            <ul className="flex-1 flex justify-center text-white items-center xl:gap-12 gap-x-4 max-lg:hidden cursor-pointer">
              <Link
                to={"/"}
                className="leading-normal no-underline font-bold text-xl hover:text-dark-green"
              >
                Home
              </Link>
              <Link
                to={"/menupage"}
                className="leading-normal no-underline font-bold text-xl hover:text-dark-green"
              >
                Menu
              </Link>
              <Link
                to={"#"}
                className="leading-normal no-underline font-bold text-xl hover:text-dark-green"
              >
                Contact
              </Link>
            </ul>

            <>
              <div className="flex max-lg:hidden gap-x-4 items-center">
                <div className="flex items-center gap-2 cursor-pointer bg-green px-2 rounded-md hover:bg-dark-green">
                  <FaPhoneAlt />
                  <span>+123</span>
                </div>
                {!user ? (
                  <Link to={"/signin"}>
                    <Button text={"Sign In"} />
                  </Link>
                ) : (
                  <>
                    <div
                      className="relative"
                      onClick={handleUserNavPanel}
                      onBlur={handleBlur}
                    >
                      <button className="w-12 h-12 mt-1">
                        <img
                          src={profile}
                          alt="profile_img"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </button>
                      {userNavPanel ? <UserNavigation /> : ""}
                    </div>
                  </>
                )}
                <Link to={"/cart"}>
                  <CartIcon />
                </Link>
              </div>
            </>
            {dropDown ? (
              <div
                className="lg:hidden text-[22px] cursor-pointer text-white"
                onClick={showDropDown}
              >
                <MdClose className="text-3xl" />{" "}
              </div>
            ) : (
              <div
                className="lg:hidden text-[22px] cursor-pointer text-white"
                onClick={showDropDown}
              >
                {" "}
                <HiMenuAlt3 className="text-3xl" />
              </div>
            )}
          </div>
          {dropDown ? (
            <motion.div
              className="lg:hidden w-full h-[100vh] fixed top-24 bg-grey  ease-in-out duration-100 right-0"
              onClick={showDropDown}
              initial={{ opacity: 0 }}
              animate={{ opacity: dropDown ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-[320px] flex flex-col items-baseline pt-14 gap-6 ">
                <ul className="text-center p-0 flex flex-col justify-center w-full gap-y-8 text-black">
                  <li>
                    <Link
                      to={"/"}
                      className="leading-normal no-underline  font-bold text-2xl hover:bg-dark-green"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/menupage"}
                      className="leading-normal no-underline  font-bold text-2xl hover:bg-dark-green"
                    >
                      Menu
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="leading-normal no-underline  font-bold text-2xl hover:bg-dark-green"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="flex flex-col justify-center items-center w-full gap-y-8 mt-4">
                  {!user ? (
                    <Link to={"/signin"}>
                      <Button text={"Sign In"} />
                    </Link>
                  ) : (
                    <Link to={"/orders"}>
                      <Button text={"Order"} />
                    </Link>
                  )}
                  <Link to={"/cart"} className="text-black">
                    <CartIcon />
                  </Link>
                  <div className="flex items-center justify-center gap-3 cursor-pointer text-black">
                    <FaFacebook className="text-4xl hover:scale-105 duration-300 hover:bg-green2" />
                    <FaInstagram className="text-4xl hover:scale-105 duration-30 hover:text-green2" />
                    <FaTelegram className="text-4xl hover:scale-105 duration-30 hover:text-green2" />
                    <FaGoogle className="text-4xl hover:scale-105 duration-30 hover:text-green2" />
                    <FaTwitter className="text-4xl hover:scale-105 duration-30 hover:text-green2" />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
