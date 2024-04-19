import { Toaster } from "react-hot-toast";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import SpecialDishes from "../components/SpecialDishes";

import Team from "../components/Team";

const Home = () => {
  return (
    <>
      <Toaster />
      <Banner />
      <Categories />
      <SpecialDishes />
      <Team />
    </>
  );
};

export default Home;
