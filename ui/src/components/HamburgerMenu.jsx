import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const menuItemVariants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const underlineVariants = {
  hover: {
    borderBottom: "2px solid #00FF00",
  },
};

const HamburgerMenu = ({ show, onClose }) => {
  return (
    <motion.div
      className={
        "fixed sm:hidden bg-white w-full h-[100%] z-50 " +
        (show ? "show" : "hide")
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3 }}
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
      <motion.div
        className=""
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.1 }}
      >
        <ul className="flex space-y-1 md:flex-row flex-col md:items-center md:gap-[4vw] cursor-pointer">
          <motion.li
            variants={menuItemVariants}
            whileHover="hover"
            className="py-7 pl-6"
            initial="hidden"
            animate={show ? "visible" : "hidden"}
          >
            <motion.a
              variants={underlineVariants}
              className="text-xl font-gelasio capitalize text-center mb-24 text-green "
              href="/menu"
            >
              Menu
            </motion.a>
          </motion.li>

          <motion.li variants={menuItemVariants} className="py-7 pl-6">
            <a
              className="text-2xl font-gelasio capitalize text-center mb-24 text-green"
              href="#"
            >
              About
            </a>
          </motion.li>
          <motion.li variants={menuItemVariants} className="py-7 pl-6">
            <a
              className="text-xl font-gelasio capitalize text-center mb-24 text-green"
              href="#"
            >
              Contact
            </a>
          </motion.li>
          <motion.li variants={menuItemVariants} className="py-7 pl-6">
            <a
              className="text-2xl font-gelasio capitalize text-center mb-24 text-green"
              href="#"
            >
              Category
            </a>
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default HamburgerMenu;
