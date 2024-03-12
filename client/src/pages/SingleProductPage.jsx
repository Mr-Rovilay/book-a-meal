import Price from "../components/Price";
import { singleProduct } from "../data";

const SingleProductPage = () => {
  return (
    <section className="">
      <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around md:flex-row md:gap-8 md:items-center">
        {singleProduct.img && (
          <div className="w-full md:w-1/2 h-1/2 md:h-auto">
            <img
              src={singleProduct.img}
              alt=""
              className="object-contain w-full h-full sm:mt-16"
            />
          </div>
        )}

        <div className="flex flex-col justify-center w-full md:w-1/2 gap-4 md:gap-6 xl:gap-8">
          <h1 className="text-3xl font-bold uppercase xl:text-5xl text-dark-green">
            {singleProduct.title}
          </h1>
          <p className="text-xl">{singleProduct.desc}</p>
          <Price
            price={singleProduct.price}
            id={singleProduct.id}
            options={singleProduct.options}
          />
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
