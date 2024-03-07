import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";

const Carticon = () => {
  return (
    <Link href="/cart" className="flex items-center gap-4">
      <div className="relative ">
        <BsCart className="text-white lg:text-black fill w-8 h-8 md:w-5 md:h-5" />
      </div>
      <span className="text-white text-2xl lg:text-black">Cart (3)</span>
    </Link>
  );
};

export default Carticon;
