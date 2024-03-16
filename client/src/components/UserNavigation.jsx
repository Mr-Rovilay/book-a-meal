import { Link } from "react-router-dom";

import AnimationWrapper from "../common/AnimationWrapper";

const UserNavigation = () => {
  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50"
    >
      <div className="bg-white flex flex-col absolute right-0 border border-grey w-60 duration-200">
        <Link
          to={"/orderspage"}
          className="flex gap-2 link m:hidden pl-8 py-4 hover:bg-grey"
        >
          <p className="">Orders</p>
        </Link>
        <Link to={"#"} className="link pl-8 py-4 hover:bg-grey">
          Dashboard
        </Link>

        <Link to={"#"} className="link pl-8 py-4 hover:bg-grey">
          Profile
        </Link>

        <Link to={"#"} className="link pl-8 py-4 hover:bg-grey">
          Settings
        </Link>

        <span className="absolute border-top border-grey w-[100%]"></span>
        <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4">
          <h1 className="font-bold text-xl mg-1">SignOut</h1>
          <p className="text-dark-grey">@deji</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigation;
