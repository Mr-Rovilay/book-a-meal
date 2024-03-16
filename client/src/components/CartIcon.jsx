import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";

const Carticon = () => {
  return (
    <Link to="/cartpage" className="flex items-center gap-4">
      <div className="relative flex items-center justify-center">
        <BsCart className="lg:text-white fill w-8 h-8 md:w-5 md:h-5" />
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red flex items-center justify-center">
          <p className="text-white font-semibold">2</p>
        </div>
      </div>
    </Link>
  );
};

export default Carticon;
