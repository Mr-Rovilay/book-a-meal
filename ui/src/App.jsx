import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/UserAuthForm";
import Hero from "./components/Hero";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
          <Route path="/menu" element={<Menu />} />
          <Route index element={<Hero />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
