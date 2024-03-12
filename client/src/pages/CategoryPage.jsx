import { Link } from "react-router-dom";
import { pizzas } from "../data";
import AnimationWrapper from "../common/AnimationWrapper";

const CategoryPage = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover pt-20 flex items-center justify-center container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 py-28 ">
          {pizzas.map((item) => (
            <div
              key={item.id}
              className="rounded-xl shadow-lg hover:bg-grey cursor-pointer"
            >
              <Link
                to={`/product/${item.id}`}
                className="flex flex-col justify-end group"
              >
                <div className="py-0 flex flex-col items-center text-center">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="object-cover w-full h-94 md:h-72 lg:h-100"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 font-bold p-4">
                    <h1 className="text-2xl uppercase">{item.title}</h1>
                    <h2 className="text-2xl group-hover:hidden">
                      N{item.price}
                    </h2>
                    <Link to={`/product/${item.id}`}>
                      <button className="hidden group-hover:block text-center text-white text-xl bg-green p-4 py-3 rounded-lg font-semibold hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out">
                        Add to Cart
                      </button>
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
