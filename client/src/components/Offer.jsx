import turkey3 from "../imgs/turkey3.jpeg";
import CountDown from "./CountDown";

const Offer = () => {
  return (
    <section className="bg-black border-b-2 border-b-green">
      <div className=" flex flex-col md:flex-row md:justify-between py-9">
        <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
          <h1 className="uppercase font-cursive text-green text-5xl font-bold xl:text-6xl">
            Available Delicious Food On Discount
          </h1>
          <p className="text-white text-2xl xl:text-xl ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe
            fugit expedita fugiat odit, esse doloremque porro quasi numquam
            eaque veritatis, amet dolorum deserunt inventore repellendus aliquid
            non assumenda! Atque, corrupti!
          </p>
          <CountDown />
          <button className="text-center text-white text-2xl bg-green p-4 py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out">
            order now
          </button>
        </div>
        <div className="flex-1 w-full relative md:h-full sm:pt-5">
          <img src={turkey3} alt="" className="object-contain rounded-xl" />
        </div>
      </div>
    </section>
  );
};

export default Offer;
