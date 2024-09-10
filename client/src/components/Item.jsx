import { Link } from "react-router-dom";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const Item = ({ product }) => {
  return (
    <div className="ring-1 ring-slate-900/5 rounded-xl">
      <Link
        to={""}
        className="p-4 bg-white flexCenter ring-1 ring-slate-900/5 rounded-t-xl"
      >
        <img
          src={product.image}
          alt="productImg"
          srcSet=""
          height={222}
          width={222}
          className="object-contain aspect-square rounded-xl"
        />
      </Link>
      <div className="p-3 bg-primary">
        <h4 className="mb-1 bold-16 line-clamp-1">{product.name}</h4>
        <p className="line-clamp-2">{product.description}</p>
      </div>
      <div className="p-3 py-4 bg-white flexBetween rounded-xl">
        <div className="flex flex-col gap-2 medium-14">
          <h5 className="">Savings</h5>
          <div className="gap-2 rounded-sm bg-primary flexBetween">
            <FaMinus className="w-5 h-5 p-1 rounded-sm cursor-pointer bg-primary" />
          <p className="">0</p>
          <FaPlus className="w-5 h-5 p-1 text-white rounded-sm cursor-pointer bg-secondary" />
          </div>
        </div>
        <hr className="w-[1px] h-12 bg-slate-900/20" />
        <div className="flex-col gap-2 flexCenter medium-14">
          <h5 className="">Preparation</h5>
          <p className="medium-14">5min</p>
        </div>
        <hr className="w-[1px] h-12 bg-slate-900/20" />
        <div className="flex-col gap-2 flexCenter medium-14">
          <h5 className="">Cook</h5>
          <p className="medium-14">20min</p>
        </div>
        <hr className="w-[1px] h-12 bg-slate-900/20" />
        <div className="flex-col gap-2 flexCenter medium-14">
          <h5 className="">Price</h5>
          <p className="medium-14">{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
