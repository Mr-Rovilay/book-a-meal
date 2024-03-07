import { HiSearch } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import imgBg from "../imgs/bg-green.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="pt-24 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      <section>
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
          <h1 className="xl:text-7xl lg:text-1xl sm:text-3xl text-2xl xl:leading-normal lg:leading-normal font-bold text-center capitalize">
            Book your{" "}
            <span className=" text-dark-green text-5xl whitespace-pre">
              Meal
            </span>{" "}
            from <br /> the comfort of your home, office etc.
          </h1>
          <p className="text-2xl  text-center leading-10 my-8 text-grey font-bold bg-primary">
            Discover a world of culinary delight at your fingertips. Indulge in
            exquisite flavors, crafted with care and passion. Whether you're
            craving comfort food or seeking adventurous cuisines, our diverse
            selection caters to every palate. Experience convenience like never
            before - order from the comfort of your home, office, or wherever
            you may be. Let us tantalize your taste buds and elevate your dining
            experience.
          </p>

          <div className="flex items-center border-2 border-solid border-dark-green rounded-full h-16 lg:w-2/5 w-full py-2 relative mt-4">
            <input
              className="bg-transparent h-full border-none outline-none absolute px-20 xl:text-2xl text-base"
              type="text"
              placeholder="Search Your meal"
              aria-label="Search your meal"
            />
            <button
              className="bg-green rounded-full text-white w-12 h-12 absolute left-2 border-none"
              aria-label="Search button"
            >
              <HiSearch className="text-2xl ml-2" />
            </button>
            <button className="flex items-center bg-white text-dark-grey absolute right-2 rounded-full lg:px-4 px-2 h-[90%] xl:text-xl text-xl font-normal gap-x-2 border-none">
              <IoLocationOutline className="text-dark-grey lg:text-3xl" /> Any
              Location
            </button>
          </div>
          <Link
            className="text-center text-white bg-green py-4 px-6 rounded-lg font-semibold mt-5 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
            to={"/signup"}
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
