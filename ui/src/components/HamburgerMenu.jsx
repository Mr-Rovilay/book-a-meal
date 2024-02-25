import { Link } from "react-router-dom";

const HamburgerMenu = ({ show, onClose }) => {
  return (
    <div
      className={
        "fixed sm:hidden bg-white w-full h-full z-50 " +
        (show ? "show" : "hide")
      }
    >
      <div className="flex justify-between items-center w-full px-6 py-6">
        <Link to="/" className="flex-none w-10">
          <h5 className="text-green font-semibold text-2xl"> Meal</h5>
        </Link>

        <button
          className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center text-dark-grey"
          onClick={onClose}
        >
          <i className="fi fi-rr-cross"></i>
        </button>
      </div>
    </div>
  );
};

export default HamburgerMenu;
