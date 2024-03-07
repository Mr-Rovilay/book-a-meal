import AnimationWrapper from "../common/AnimationWrapper";
import Hero from "../components/Hero";
import Menu from "../components/Menu";

const HomePage = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <Hero />
      <Menu />
    </AnimationWrapper>
  );
};

export default HomePage;
