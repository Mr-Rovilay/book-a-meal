import AnimationWrapper from "../common/AnimationWrapper";

const CartPage = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="">
        <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col justify-center lg:flex-row ">
          {/* PRODUCTS CONTAINER */}
          <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40 gap-4">
            {/* SINGLE ITEM */}
            <div className="flex items-center justify-between">
              <img src="../assets/p1.png" alt="" width={100} height={100} />
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
            {/* SINGLE ITEM */}
            <div className="flex items-center justify-between">
              <img src="../assets/m1.png" alt="" width={100} height={100} />
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
            {/* SINGLE ITEM */}
            <div className="flex items-center justify-between">
              <img src="../assets/p2.png" alt="" width={100} height={100} />
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
          {/* PAYMENT CONTAINER */}
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
            <button
              className="text-center text-white bg-green py-4 px-6 rounded-lg font-semibold hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
              to={"#"}
            >
              Order Now
            </button>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default CartPage;
