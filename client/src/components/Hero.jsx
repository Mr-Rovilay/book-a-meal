import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative z-0 flex flex-col gap-5 max-padd-container xl:flex-row gap-y-20">
      <div className="absolute xl:-top-1 xl:-right-[42%] -right-[1/4] bg-hero bg-repeat-round -z-10 w-full xl:h-[722px] h-[590px] overflow-hidden" />
      <div className="flex-1 pt-48">
        <h2>Delicious meals Delivered Right <span className="">to Your door Step</span></h2>
        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae velit omnis minus modi iste quia, at perferendis animi? Culpa, modi voluptate distinctio iure at dolorem sapiente hic est dolor quaerat.</p>
        <div className="">
          <Link to={""}>Order Now</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
