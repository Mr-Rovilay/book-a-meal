import { Link } from "react-router-dom";

const HamburgerMenu = ({ show, onClose }) => {
  return (
    <div
      className={
        "fixed sm:hidden bg-grey  w-full h-[60%] z-50 " +
        (show ? "show" : "hide")
      }
    >
      <div className="flex justify-between items-center w-full px-6 py-6">
        <Link to="/" className="flex-none">
          <h5 className="text-green font-semibold text-2xl">Meal</h5>
        </Link>

        <button
          className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center text-dark-grey"
          onClick={onClose}
        >
          <i className="fi fi-rr-cross"></i>
        </button>
      </div>
      <div className="">
        <ul className="flex space-y-1 md:flex-row flex-col md:items-center md:gap-[4vw] cursor-pointer">
          <li className="py-7 pl-6">
            <a
              className="text-xl font-gelasio capitalize text-center mb-24 text-green "
              href="#"
            >
              Menu
            </a>
          </li>
          <li className="py-7 pl-6">
            <a
              className="text-2xl font-gelasio capitalize text-center mb-24 text-green"
              href="#"
            >
              About
            </a>
          </li>
          <li className="py-7 pl-6">
            <a
              className="text-xl font-gelasio capitalize text-center mb-24 text-green"
              href="#"
            >
              Contact
            </a>
          </li>
          <li className="py-7 pl-6">
            <a
              className="text-2xl font-gelasio capitalize text-center mb-24 text-green"
              href="#"
            >
              Categories
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
