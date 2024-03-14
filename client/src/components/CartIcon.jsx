import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";

const Carticon = () => {
  return (
    <Link to="/cartpage" className="flex items-center gap-4">
      <div className="relative ">
        <BsCart className="lg:text-white fill w-8 h-8 md:w-5 md:h-5" />
      </div>
    </Link>
  );
};

export default Carticon;
