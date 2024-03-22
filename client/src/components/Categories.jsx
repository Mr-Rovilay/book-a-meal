import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const categoryItems = [
  {
    id: 1,
    title: "Main Dish",
    desc: "(86 dishes)",
    price: 24.9,
    image: "imgs/p3.png",
  },
  {
    id: 2,
    title: "Break Fast",
    desc: "(12 break fast)",
    price: 24.9,
    image: "recipes/img3.png",
  },
  {
    id: 3,
    title: "Dessert",
    desc: "(48 dessert)",
    price: 24.9,
    image: "recipes/img1.png",
  },
];

const Categories = () => {
  return (
    <div className="section-container mx-auto xl:px-24 px-4 py-8">
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Popular Catagories</h2>
      </div>

      {/* category cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-10 ">
        {categoryItems.map((item) => (
          <div key={item.id} className="rounded-lg shadow-md overflow-hidden">
            <Link to={""} className="block">
              <div className="relative flex items-center justify-center">
                <img
                  src={item.image}
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
    </div>
  );
};

export default Categories;
