import { Link } from "react-router-dom";
import { menu } from "../data";
import AnimationWrapper from "../common/AnimationWrapper";
import img from "../../public/assets/p5.png";

const MenuPage = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="">
        <div className="h-cover pt-20 flex items-center justify-center container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {menu.map((category) => (
              <div
                className="rounded-xl shadow-lg hover:bg-grey cursor-pointer"
                key={category.id}
              >
                <Link to={`/categorypage/${category.slug}`}>
                  <div className="p-5 flex flex-col items-center text-center">
                    <div className="rounded-xl overflow-hidden">
                      <img src={category.img} alt={category.title} />{" "}
                    </div>
                    <h5 className="text-2xl md:text-3xl font-medium mt-3 text-dark-grey">
                      {category.title}
                    </h5>
                    <p className="text-dark-grey text-xl mt-3">
                      {category.desc}
                    </p>
                    <button className="text-center text-white text-xl bg-green p-4 py-3 rounded-lg font-semibold mt-4 hover:bg-dark-green focus:scale-95 transition-all duration-200 ease-out">
                      Click here to Explore More
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default MenuPage;
