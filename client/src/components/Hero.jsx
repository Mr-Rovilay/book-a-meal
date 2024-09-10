import { Link } from "react-router-dom";
import {FaArrowRightLong} from "react-icons/fa6"
import heroImg from "../assets/bg.png"

const Hero = () => {
  return (
    <section id={"home"} className="relative z-0 flex flex-col gap-5 max-padd-container xl:flex-row gap-y-20">
      <div className="absolute xl:-top-1 xl:-right-[42%] -right-1/4 bg-hero bg-repeat-round -z-10 w-full xl:h-[722px] h-[590px] overflow-hidden" />
      <div className="flex-1 pt-48 max-w-[611px]">
        <h2 className="tracking-[1px] capitalize h1">Delicious meals Delivered Right <span className="xl:text-secondary">to Your door Step</span></h2>
        <p className="pt-4 pb-14">
          Experience top-notch cuisine delivered to your home with ease. From mouth-watering starters to satisfying main courses, we&apos;ve got you covered. Place your order now and enjoy a variety of delectable meals from the comfort of your home.
        </p>
        <div className="inline-flex flex-col gap-3 xs:flex-row xs:items-center">
          <Link to={""} className="rounded-full btn-secondary !px-12">Order Now</Link> 
          <Link to={""} className="rounded-full btn-outline flexCenter gap-x-3 !px-12">Explore Menu<FaArrowRightLong className=""/></Link> 
        </div>
      </div>
      {/* right */}
      <div className="flex items-end justify-end xl:flex-1">
        <div className="relative xl:w-full w-[90%] xl:h-full h-[590px] xl:pt-20 xl:pl-24 z-0">
          <img src={heroImg} alt="" srcSet="" className="object-contain" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
