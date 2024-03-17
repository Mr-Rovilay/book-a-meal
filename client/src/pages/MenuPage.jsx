import { Link } from "react-router-dom";
import { menu } from "../data";
import AnimationWrapper from "../common/AnimationWrapper";
import Button from "../components/Button";
import Search from "../components/Search";

const MenuPage = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="">
        <div className="flex flex-col items-center">
          {" "}
          <h1 className="capitalize text-3xl flex flex-col items-center justify-center pt-40 text-dark-green font-extralight xl:text-5xl ">
            Check out Our category
          </h1>
          <Search text={"search available category here"} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pb-20">
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
                    <div className="pt-5">
                      <Button text={"click here to explore more"} />
                    </div>
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
