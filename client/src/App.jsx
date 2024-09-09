import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Verify from "./pages/Verify";
import MyOrders from "./pages/MyOrders";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="overflow-hidden text-[#404040]">
      <BrowserRouter>
        <div className="bg-primary">
          <Header />
          <Routes>
            {/* Add your routes here */}
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />}>
              <Route path="/:productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myyorders" element={<MyOrders />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
