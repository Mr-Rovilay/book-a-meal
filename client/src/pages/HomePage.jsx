import AnimationWrapper from "../common/AnimationWrapper";
import Hero from "../components/Hero";
import Menu from "../components/Menu";
import Offer from "../components/Offer";
import Team from "../components/Team";

const HomePage = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <Hero />
      <Menu />
      <Offer />
      <Team />
    </AnimationWrapper>
  );
};

export default HomePage;
