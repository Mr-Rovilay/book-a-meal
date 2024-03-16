import { featuredProducts } from "../data";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <section className="">
      <div className="text-center mb-9">
        <h3 className="uppercase text-dark-green text-4xl font-extralight xl:text-5xl">
          Discover Our Menu
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <p className="text-green-600 font-semibold mt-2 text-2xl">
                  N{item.price}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
