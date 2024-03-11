import turkey1 from "../imgs/turkey1.jpeg";
import turkey from "../imgs/turkey.jpg";
import jollofRice from "../imgs/j-rice.jpeg";

const Menu = () => {
  return (
    <section className="">
      <div className="text-center mb-9">
        <h3 className="uppercase text-dark-green text-4xl font-bold xl:text-5xl">
          Discover Our Menu
        </h3>
      </div>
      <div className="flex items-center justify-center container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <div className="rounded-xl shadow-lg hover:bg-grey cursor-pointer">
            <div className="p-5 flex flex-col items-center text-center">
              <div className="rounded-xl overflow-hidden">
                <img src={turkey} alt="" className="" />
              </div>
              <h5 className="text-2xl md:text-3xl font-medium mt-3">
                Egusi & Pounded Yam
              </h5>
              <p className="text-dark-grey text-xl mt-3">
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci provident facilis earum, eaque laborum excepturi
                doloremque, velit, repellendus non inventore quidem. Pariatur
                harum architecto temporibus hic veniam mollitia maiores fugiat?
              </p>
              <span className="font-bold text-3xl">N3000</span>
              <a
                href="#"
                className="text-center text-white text-xl bg-green p-4 py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
              >
                Add to Cart
              </a>
            </div>
          </div>

          <div className="rounded-xl shadow-lg hover:bg-grey cursor-pointer ">
            <div className="p-5 flex flex-col items-center text-center">
              <div className="rounded-xl overflow-hidden">
                <img src={jollofRice} alt="" className="" />
              </div>
              <h5 className="text-2xl md:text-3xl font-medium mt-3">
                Egusi & Pounded Yam
              </h5>
              <p className="text-dark-grey text-xl mt-3">
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci provident facilis earum, eaque laborum excepturi
                doloremque, velit, repellendus non inventore quidem. Pariatur
                harum architecto temporibus hic veniam mollitia maiores fugiat?
              </p>
              <span className="font-bold text-3xl">N3000</span>
              <a
                href="#"
                className="text-center text-white text-xl bg-green p-4 py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
              >
                Add to Cart
              </a>
            </div>
          </div>

          <div className="rounded-xl shadow-lg hover:bg-grey cursor-pointer ">
            <div className="p-5 flex flex-col items-center text-center justify-center">
              <div className="rounded-xl overflow-hidden">
                <img src={turkey1} alt="" className="" />
              </div>
              <h5 className="text-2xl md:text-3xl font-medium mt-3">
                Egusi & Pounded Yam
              </h5>
              <p className="text-dark-grey text-xl mt-3">
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci provident facilis earum, eaque laborum excepturi
                doloremque, velit, repellendus non inventore quidem. Pariatur
                harum architecto temporibus hic veniam mollitia maiores fugiat?
              </p>
              <span className="font-bold text-3xl">N3000</span>
              <a
                href="#"
                className="text-center text-white text-xl bg-green p-4 py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
              >
                Add to Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
