import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { LuUser2 } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { ShopContext } from "../context/ShopContext";

const Header = ({setShowLogin}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [header, setHeader] = useState(false);
  const {getTotalCartItems, token, setToken} = useContext(ShopContext)
  const navigate = useNavigate();
  // react hook to assess the current url
  const location = useLocation(); 
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  }
  const logout = () => {
    localStorage.removeItem("token")
    setToken(null);
    navigate("/"); 
  }
  useEffect (()=> {
    const handleScroll = () => {  
      window.scrollY>35 ? setHeader(true) : setHeader(false);    
    }
    const checkUrl = () => {
      const currentUrl = window.location.href
      if (currentUrl !== "http://localhost:5173/") {
        setHeader(true) 
        
      } else{
       window.addEventListener("scroll",handleScroll) 
      }
    }
    checkUrl()
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  },[location])
  return (
    <header className={`${header ? "bg-white shadow-sm py-4": "bg-transparent py-5"} fixed left-0 right-0 z-10 w-full transition-all duration-300 bg-white`}>
      <div className="max-padd-container flexBetween">
        <Link to={"/"} className="bold-24">
          <h4>
            Book<span className="text-secondary">a</span>Meal
          </h4>
        </Link>
        <div className="flexBetween gap-x-20">
          <Navbar
            containerStyles={`${
              menuOpen
                ? "flex md:hidden items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-xl w-64 medium-16 ring-2 ring-slate-900/5 transition-all duration-300"
                : "hidden md:flex gap-x-5 xl:gap-x-10 medium-15"
            }`}
            header={header}
            menuOpen={menuOpen}
          />
          <div className="flexBetween gap-x-2 xs:gap-x-8">
            {!menuOpen ? (
              <MdMenu onClick={toggleMenu} className="text-2xl cursor-pointer md:hidden" />
            ) : (
              <MdClose onClick={toggleMenu} className="text-2xl cursor-pointer md:hidden" />
            )}
            <Link to={"/cart"} className="relative flex">
              <GiShoppingBag className="text-2xl" />
              <span className="absolute text-sm bg-white text-red-500 -right-2.5 -top-2.5 flexCenter w-5 h-5 rounded-full shadow-md">
           {   getTotalCartItems()}
              </span>
            </Link>
            {!token ? (
              <button onClick={()=> setShowLogin(true)} className="flex items-center rounded-full btn-light gap-x-2">
                <LuUser2 className="bold 18px" />
                Login
              </button>
            ) : (
              <div className="relative group">
                <FaCircleUser className="text-2xl cursor-pointer" />
                <ul className="absolute right-0 flex-col hidden w-24 p-3 rounded shadow-sm bg-primary ring-1 ring-slate-900/15 group-hover:flex">
                  <li
                    className="cursor-pointer flexCenter gap-x-2"
                    onClick={() => navigate("/myorders")}
                  >
                    <FiPackage />
                    <p>Orders</p>
                  </li>
                  <hr className="my-2" />

                  <li
                    className="cursor-pointer flexCenter gap-x-2"
                    onClick={logout}
                  >
                    <TbLogout className="" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
