import { Link } from "react-router-dom";
import turkey3 from "../imgs/turkey3.jpeg";
import Button from "./Button";
import CountDown from "./CountDown";

const Offer = () => {
  return (
    <section className="bg-grey">
      <div className="offer-content flex flex-col md:flex-row md:justify-between py-9 ">
        <div className=" flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
          <h1 className=" uppercase text-dark-green text-3xl font-extralight xl:text-3xl">
            Available Delicious Food On Discount
          </h1>
          <p className=" text-dark-grey text-2xl xl:text-xl">
            Indulge in a culinary adventure with our delectable selection of
            discounted delicacies, handcrafted to tantalize your taste buds.
            Discover a world of flavors, where every bite tells a story of
            passion and craftsmanship. Whether you crave the comforting warmth
            of traditional favorites or the adventurous allure of bold,
            innovative dishes, our menu has something to satisfy every palate.
            Join us on a journey of culinary excellence, where each dish is a
            celebration of quality ingredients and expert culinary artistry.
            Elevate your dining experience today and savor the extraordinary at
            our table
          </p>
          <CountDown />
          <Link to={"#"}>
            <Button text={"Place Order"} />
          </Link>
        </div>
        <div className="flex-1 w-full relative md:h-full sm:pt-5">
          <img
            src={turkey3}
            alt="Delicious food"
            className="offer-image-src object-contain rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Offer;
