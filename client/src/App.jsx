import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/UserAuthForm";
import Footer from "./components/Footer";
import MenuPage from "./pages/MenuPage";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/menupage" element={<MenuPage />} />
        <Route path="/categorypage" element={<CategoryPage />} />
        <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
