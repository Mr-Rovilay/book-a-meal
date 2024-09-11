import { NavLink } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";
import { BsCardList } from "react-icons/bs";
import { FaListCheck } from "react-icons/fa6";
const Sidebar = () => {
  return (
    <div className="p-6 pb-3 mb-3 bg-white max-sm:flexCenter max-xs:pb-3 rounded-xl sm:w-1/5 sm:min-h-screen lg:pl-12 sm:pr-3 sm:mr-3">
        <div className="flex gap-5 pt-4 sm:flex-col sm:pt-10">

      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "active-link"
            : "flexStart gap-x-2 p-5 medium-15 cursor-pointer max-w-60 h-10 rounded-xl"
        }
      >
        <BsPlusSquare />
        <div className="hidden md:flex">Add Items</div>
      </NavLink>
      <NavLink
        to={"/list"}
        className={({ isActive }) =>
          isActive
            ? "active-link"
            : "flexStart gap-x-2 p-5 medium-15 cursor-pointer max-w-60 h-10 rounded-xl"
        }
      >
        <BsCardList />
        <div className="hidden md:flex">List Items</div>
      </NavLink>
      <NavLink
        to={"/orders"}
        className={({ isActive }) =>
          isActive
            ? "active-link"
            : "flexStart gap-x-2 p-5 medium-15 cursor-pointer max-w-60 h-10 rounded-xl"
        }
      >
     <FaListCheck />
        <div className="hidden md:flex">Orders</div>
      </NavLink>
        </div>
    </div>
  );
};

export default Sidebar;
