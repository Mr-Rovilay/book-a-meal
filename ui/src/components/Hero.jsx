import AnimationWrapper from "../common/AnimationWrapper";
import Egusi from "../imgs/slazzer-edit-image.png";
import Button from "../shared/Button";

const HeroSection = () => {
  return (
    <AnimationWrapper>
      <section className="h-screen">
        <div className="container py-16 sm:py-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center min-h-[600px]">
            <div className="text-container space-y-5 text-dark-grey sm:text-center">
              <h1 className="text-5xl">
                <span className="font-cursive text-green text-5xl">
                  Delightful
                </span>{" "}
                Dining Experience{" "}
                <span className="font-cursive text-green text-5xl">Awaits</span>{" "}
                You
              </h1>
              <p className="lg:pr-64 ">
                Indulge in exquisite flavors brought straight to your table.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Button />
            </div>
            <div className="image-container relative">
              <img
                className="w-full sm:scale-125 sm:translate-y-16"
                src={Egusi}
                alt="Delicious Dish"
              />
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HeroSection;
