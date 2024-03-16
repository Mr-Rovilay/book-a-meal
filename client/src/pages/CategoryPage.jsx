import { Link } from "react-router-dom";
import { pizzas } from "../data";
import { featuredProducts } from "../data";
import AnimationWrapper from "../common/AnimationWrapper";
import Button from "../components/Button";
import Search from "../components/Search";

const CategoryPage = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="mx-auto pt-16 ">
        <h1 className="capitalize text-3xl flex flex-col items-center justify-center py-10 text-dark-green font-extralight xl:text-5xl ">
          Check out Our menu
        </h1>
        <Search text={"search available category here"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((item) => (
            <div key={item.id} className="rounded-lg shadow-md overflow-hidden">
              <Link to={`/product/${item.id}`} className="block">
                <div className="relative flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="object-cover h-94 md:h-72"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity opacity-0 hover:opacity-100 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">
                      View Details
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h1 className="text-dark-green text-3xl font-medium mt-3">
                    {item.title}
                  </h1>
                  <p className="text-dark-grey">{item.desc}</p>
                  <div className="flex justify-between mt-3">
                    <p className="text-green-600 font-semibold mt-2 text-2xl">
                      N{item.price}
                    </p>
                    <Link to={"/cartpage"}>
                      <Button text={"add to cart"} />
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {featuredProducts.map((item) => (
            <div key={item.id} className="rounded-lg shadow-lg overflow-hidden">
              <Link to={`/product/${item.id}`} className="block">
                <div className="relative flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="object-cover h-94 md:h-72"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity opacity-0 hover:opacity-100 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">
                      View Details
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h1 className="text-dark-green text-3xl font-medium mt-3">
                    {item.title}
                  </h1>
                  <p className="text-dark-grey">{item.desc}</p>
                  <div className="flex justify-between mt-3">
                    <p className="text-green-600 font-semibold mt-2 text-2xl">
                      N{item.price}
                    </p>
                    <Link to={"/cartpage"}>
                      <Button text={"add to cart"} />
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default CategoryPage;
