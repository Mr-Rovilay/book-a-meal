import { Link } from "react-router-dom";
import { menu } from "../data";
import turkey3 from "../imgs/turkey3.jpeg";
import turkey1 from "../imgs/turkey1.jpeg";
import turkey from "../imgs/turkey.jpg";
import jollofRice from "../imgs/j-rice.jpeg";

const MenuPage = () => {
  return (
    <section className="h-screen">
      <div className="h-screen flex items-center justify-center container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <div className="rounded-xl shadow-lg hover:bg-grey cursor-pointer">
            <Link>
              <div className="p-5 flex flex-col items-center text-center">
                <div className="rounded-xl overflow-hidden">
                  <img src={turkey} alt="" className="" />
                </div>
                <h5 className="text-2xl md:text-3xl font-medium mt-3">
                  Egusi and Pounded Yam
                </h5>
                <p className="text-dark-grey text-2xl mt-3">
                  {" "}
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Adipisci provident facilis earum, eaque laborum excepturi
                  doloremque, velit, repellendus non inventore quidem. Pariatur
                  harum architecto temporibus hic veniam mollitia maiores
                  fugiat?
                </p>
                <a
                  href="#"
                  className="text-center text-white text-2xl bg-green p-4 py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
                >
                  Click here to Explore More
                </a>
              </div>
            </Link>
          </div>

          <div className="rounded-xl shadow-lg hover:bg-grey cursor-pointer ">
            <Link>
              <div className="p-5 flex flex-col items-center text-center">
                <div className="rounded-xl overflow-hidden">
                  <img src={jollofRice} alt="" className="" />
                </div>
                <h5 className="text-2xl md:text-3xl font-medium mt-3">
                  Chicken and Rice
                </h5>
                <p className="text-dark-grey text-2xl mt-3">
                  {" "}
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Adipisci provident facilis earum, eaque laborum excepturi
                  doloremque, velit, repellendus non inventore quidem. Pariatur
                  harum architecto temporibus hic veniam mollitia maiores
                  fugiat?
                </p>

                <a
                  href="#"
                  className="text-center text-white text-2xl bg-green p-4 py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
                >
                  Click here to Explore More
                </a>
              </div>
            </Link>
          </div>

          <div className="rounded-xl shadow-lg hover:bg-grey  cursor-pointer ">
            <Link to={"/categorypage"}>
              <div className="p-5 flex flex-col items-center text-center justify-center">
                <div className="rounded-xl overflow-hidden">
                  <img src={turkey1} alt="" className="" />
                </div>
                <h5 className="text-2xl md:text-3xl font-medium mt-3">
                  Yam and Egg
                </h5>
                <p className="text-dark-grey text-2xl mt-3">
                  {" "}
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Adipisci provident facilis earum, eaque laborum excepturi
                  doloremque, velit, repellendus non inventore quidem. Pariatur
                  harum architecto temporibus hic veniam mollitia maiores
                  fugiat?
                </p>

                <a
                  href="#"
                  className="text-center text-white text-2xl bg-green p-4 py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
                >
                  Click here to Explore More
                </a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
