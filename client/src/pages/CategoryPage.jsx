import { Link } from "react-router-dom";
import { pizzas } from "../data";
import AnimationWrapper from "../common/AnimationWrapper";
import img from "../../public/assets/p5.png";

const CategoryPage = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover pt-20 flex items-center justify-center container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 py-28 ">
          {pizzas.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="flex flex-col justify-between group group "
            >
              <div
                className="rounded-xl shadow-lg hover:bg-grey cursor-pointer"
                key={item.id}
              >
                <Link to={item.slug}>
                  <div className="py-0 flex flex-col items-center text-center">
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src={img}
                        alt={item.title}
                        className="object-contain"
                      />{" "}
                    </div>

                    <div className="flex items-center justify-between gap-4 font-bold">
                      <h1 className="text-xl uppercase p-2">{item.title}</h1>
                      <h2 className="group-hover:hidden text-xl">
                        N{item.price}
                      </h2>
                      <div className="pb-3">
                        <button
                          href="#"
                          className="hidden group-hover:block text-center text-white text-xl bg-green p-4 py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default CategoryPage;
