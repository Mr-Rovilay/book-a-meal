import { HiSearch } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import imgBg from "../imgs/bg-green.jpg";
import { Link } from "react-router-dom";
import Button from "./Button";
import Search from "./Search";

const Hero = () => {
  return (
    <div
      className="pt-24 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      <section className="mt-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
          <h1 className="xl:text-7xl lg:text-1xl sm:text-3xl text-2xl xl:leading-normal lg:leading-normal font-bold text-center capitalize">
            Book your{" "}
            <span className="text-dark-green text-5xl whitespace-pre">
              Meal
            </span>{" "}
            from <br /> the comfort of your home, office etc.
          </h1>
          <p className="text-2xl text-center leading-10 my-8 text-black">
            Discover a world of culinary delight at your fingertips. Indulge in
            exquisite flavors, crafted with care and passion. Whether you're
            craving comfort food or seeking adventurous cuisines, our diverse
            selection caters to every palate. Experience convenience like never
            before - order from the comfort of your home, office, or wherever
            you may be. Let us tantalize your taste buds and elevate your dining
            experience.
          </p>
          <Link className="mt-5" to={"/menupage"}>
            <Button text={"Order Now"} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
