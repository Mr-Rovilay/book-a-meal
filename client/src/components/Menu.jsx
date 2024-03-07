import poundedYam from "../imgs/egusi.jpeg";
import turkey3 from "../imgs/turkey3.jpeg";
import turkey1 from "../imgs/turkey1.jpeg";
import turkey from "../imgs/turkey.jpg";
import jollofRice from "../imgs/j-rice.jpeg";

const Menu = () => {
  return (
    <section>
      <div className="text-center mb-9">
        <h3 className="uppercase font-cursive text-green text-5xl">
          Discover Our Menu
        </h3>
      </div>
      <div className="flex items-center justify-center container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <div className="rounded-xl shadow-lg">
            <div className="p-5 flex flex-col">
              <div className="w-full aspect-auto rounded-xl overflow-hidden">
                <img src={poundedYam} alt="" />
              </div>
              <h5 className="text-2xl md:text-3xl font-medium mt-3">
                Egusi & Pounded Yam
              </h5>
              <p className="text-dark-grey text-lg mt-3">
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci provident facilis earum, eaque laborum excepturi
                doloremque, velit, repellendus non inventore quidem. Pariatur
                harum architecto temporibus hic veniam mollitia maiores fugiat?
              </p>
              <a
                href="#"
                className="text-center text-white bg-green py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
              >
                Add to Cart
              </a>
            </div>
          </div>
          <div className="rounded-xl shadow-lg">
            <div className="p-5 flex flex-col">
              <div className="rounded-xl overflow-hidden">
                <img src={jollofRice} alt="" />
              </div>
              <h5 className="text-2xl md:text-3xl font-medium mt-3">
                Egusi & Pounded Yam
              </h5>
              <p className="text-dark-grey text-lg mt-3">
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci provident facilis earum, eaque laborum excepturi
                doloremque, velit, repellendus non inventore quidem. Pariatur
                harum architecto temporibus hic veniam mollitia maiores fugiat?
              </p>
              <a
                href="#"
                className="text-center text-white bg-green py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
              >
                Add to Cart
              </a>
            </div>
          </div>
          <div className="rounded-xl shadow-lg">
            <div className="p-5 flex flex-col">
              <div className="rounded-xl overflow-hidden">
                <img src={turkey} alt="" />
              </div>
              <h5 className="text-2xl md:text-3xl font-medium mt-3">
                Egusi & Pounded Yam
              </h5>
              <p className="text-dark-grey text-lg mt-3">
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci provident facilis earum, eaque laborum excepturi
                doloremque, velit, repellendus non inventore quidem. Pariatur
                harum architecto temporibus hic veniam mollitia maiores fugiat?
              </p>
              <a
                href="#"
                className="text-center text-white bg-green py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
              >
                Add to Cart
              </a>
            </div>
          </div>
          <div className="rounded-xl shadow-lg">
            <div className="p-5 flex flex-col">
              <div className="rounded-xl overflow-hidden">
                <img src={turkey1} alt="" />
              </div>
              <h5 className="text-2xl md:text-3xl font-medium mt-3">
                Egusi & Pounded Yam
              </h5>
              <p className="text-dark-grey text-lg mt-3">
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci provident facilis earum, eaque laborum excepturi
                doloremque, velit, repellendus non inventore quidem. Pariatur
                harum architecto temporibus hic veniam mollitia maiores fugiat?
              </p>
              <a
                href="#"
                className="text-center text-white bg-green py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
              >
                Add to Cart
              </a>
            </div>
          </div>
          <div className="rounded-xl shadow-lg">
            <div className="p-5 flex flex-col">
              <div className="rounded-xl overflow-hidden">
                <img src={turkey3} alt="" />
              </div>
              <h5 className="text-2xl md:text-3xl font-medium mt-3">
                Egusi & Pounded Yam
              </h5>
              <p className="text-dark-grey text-lg mt-3">
                {" "}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci provident facilis earum, eaque laborum excepturi
                doloremque, velit, repellendus non inventore quidem. Pariatur
                harum architecto temporibus hic veniam mollitia maiores fugiat?
              </p>
              <a
                href="#"
                className="text-center text-white bg-green py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
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
