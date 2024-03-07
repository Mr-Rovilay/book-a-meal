import AnimationWrapper from "../common/AnimationWrapper";
import Hero from "../components/Hero";
import Menu from "../components/Menu";
import Offer from "../components/Offer";

const HomePage = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <Hero />
      <Menu />
      <Offer />
    </AnimationWrapper>
  );
};

export default HomePage;
