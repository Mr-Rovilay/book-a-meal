import { Link } from "react-router-dom";
import { pizzas } from "../data";

const CategoryPage = () => {
  return (
    <section className="h-cover pt-20">
      <div className="flex flex-wrap">
        {pizzas.map((item) => (
          <Link
            className="w-full hover:bg-grey h-[80vh] border-r-2 border-b-2 border-l-2 border-green sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group"
            to={`/product/${item.id}`}
            key={item.id}
          >
            <div className="relative h-[80%] py-0">
              <img src={item.img} alt="food" className="object-contain" />
            </div>

            <div className="flex items-center justify-between font-bold">
              <h1 className="text-2xl uppercase p-2">{item.title}</h1>
              <h2 className="group-hover:hidden text-xl">N{item.price}</h2>
              <button
                href="#"
                className="hidden group-hover:block text-center text-white text-xl bg-green p-4 py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
