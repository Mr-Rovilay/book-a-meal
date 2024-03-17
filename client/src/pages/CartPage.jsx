import { Link } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";

const CartPage = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="">
        <div className="h-screen flex flex-col justify-center lg:flex-row">
          <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40 gap-4">
            <div className="flex items-center justify-between pl-6">
              <div className="">
                <h1 className="uppercase text-dark-green text-xl font-bold">
                  Product
                </h1>
              </div>
              <div className="">
                <h1 className="uppercase text-dark-green text-xl font-bold">
                  Name
                </h1>
              </div>
              <div className="uppercase text-dark-green text-xl font-bold">
                <h2 className="font-bold">Price</h2>
              </div>
              <span className=""></span>
            </div>
            <div className="flex items-center justify-between">
              <Link to={"/product/:id"}>
                <img src="../assets/p1.png" alt="" width={100} height={100} />
              </Link>
              <div className="">
                <h1 className="uppercase text-dark-green text-xl font-bold">
                  sicilian
                </h1>
                <span>Large</span>
              </div>
              <h2 className="font-bold">N79.90</h2>
              <span className="cursor-pointer text-red">X</span>
            </div>
            <hr className="text-black text-3xl" />

            <div className="flex items-center justify-between">
              <Link to={"/product/:id"}>
                <img src="../assets/m1.png" alt="" width={100} height={100} />
              </Link>
              <div className="">
                <h1 className="uppercase text-xl text-dark-green font-bold">
                  sicilian
                </h1>
                <span>Large</span>
              </div>
              <h2 className="font-bold">N79.90</h2>
              <span className="cursor-pointer text-red">X</span>
            </div>

            <hr className="text-black text-3xl" />

            <div className="flex items-center justify-between">
              <Link to={"/product/:id"}>
                <img src="../assets/p2.png" alt="" width={100} height={100} />
              </Link>
              <div className="">
                <h1 className="uppercase text-xl text-dark-green font-bold">
                  sicilian
                </h1>
                <span>Large</span>
              </div>
              <h2 className="font-bold">N79.90</h2>
              <span className="cursor-pointer  text-red">X</span>
            </div>
          </div>

          <div className="flex justify-center flex-col lg:w-1/3 xl:w-1/2 lg:px-8 xl:px-16 gap-5 ">
            <div className="bg-grey p-4 rounded-lg mb-4">
              <div className="flex justify-between">
                <span className="py-2">Subtotal (3 items)</span>
                <span>N81.70</span>
              </div>
              <div className="flex justify-between">
                <span className="py-2">Service Cost</span>
                <span>N0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="py-2">Delivery Cost</span>
                <span className="text-green">FREE!</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <span>TOTAL (INCL. VAT)</span>
                <span className="font-bold">N81.70</span>
              </div>
            </div>
            <Link
              className="text-center text-white bg-green py-4 px-6 rounded-lg font-semibold hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
              to={"/orders"}
            >
              Check Out Now
            </Link>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default CartPage;
