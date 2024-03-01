import AnimationWrapper from "../common/AnimationWrapper";
import Egusi from "../imgs/slazzer-edit-image.png";
import Button from "../shared/Button";
import About from "./About";
import Contact from "./Contact";

import Menu from "./Menu";

const Hero = () => {
  return (
    <AnimationWrapper>
      <section className="bg-grey flex flex-col-reverse sm:flex-row items-center justify-between py-12">
        <div className="text-container space-y-5 text-dark-grey sm:text-center">
          <h1 data-aos="fade-up" className="text-5xl">
            <span className="font-cursive text-green text-5xl">Delightful</span>{" "}
            Dining Experience{" "}
            <span className="font-cursive text-green text-5xl">Awaits</span> You
          </h1>
          <p data-aos="fade-up" data-aos-delay="300" className="lg:pr-64 ">
            Indulge in exquisite flavors brought straight to your table. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="" data-aos="fade-up" data-aos-delay="500">
            <Button />
          </div>
        </div>
        <div className="ml-3 relative">
          <img className="rounded-md mb-8" src={Egusi} alt="Delicious Dish" />
        </div>
      </section>
      <Menu />
      <About />
      <Contact />
    </AnimationWrapper>
  );
};

export default Hero;
