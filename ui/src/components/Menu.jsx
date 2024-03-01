import poundedYam from "../imgs/egusi.jpeg";
import friedPlantain from "../imgs/fride-rice.webp";
import jollofRice from "../imgs/j-rice.jpeg";

const Menu = () => {
  return (
    <section className="">
      <div className="text-center mb-9">
        <h3 className="uppercase text-grey-500 font-semibold mb-9">Discover</h3>
        <h2 className="text-green font-bold text-4xl">Our Menu</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-grey p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
          <img
            src={poundedYam}
            alt="pounded yam"
            className="w-[80%] h-auto md:max-h-60 mx-auto"
          />

          <h4 className="font-bold mt-2 text-2xl my-3">Pounded Yam</h4>
          <p className="text-dark-grey text-xl">
            Indulge in the rich flavors of pounded yam, a traditional Nigerian
            dish. Served hot and fresh, accompanied by your favorite soup.
          </p>
          <button className="mt-4 btn-green">Add to Cart</button>
        </div>

        <div className="bg-grey p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
          <img
            src={friedPlantain}
            alt="fried plantain"
            className="w-[80%] h-auto md:max-h-80 mx-auto"
          />
          <h4 className="font-bold mt-2 text-2xl my-3">Fried Plantain</h4>
          <p className="text-dark-grey text-xl">
            Enjoy the crispy goodness of fried plantain, a popular West African
            snack. Perfectly golden brown and served fresh, it's an irresistible
            delight.
          </p>
          <button className="mt-4 btn-green">Add to Cart</button>
        </div>

        <div className="bg-grey p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
          <img
            src={jollofRice}
            alt="jollof rice"
            className=" w-[80%] h-auto md:max-h-60 mx-auto"
          />
          <h4 className="font-bold mt-2 text-2xl my-3">Jollof Rice</h4>
          <p className="text-dark-grey text-xl">
            Experience the exquisite taste of jollof rice, a beloved African
            dish. Prepared with fragrant spices and fresh ingredients, it's a
            culinary delight you won't forget.
          </p>
          <button className="mt-4 btn-green">Add to Cart</button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
