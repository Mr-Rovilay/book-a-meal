// Import necessary dependencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import SignUp from "../components/SignUp";
import UpdateProfile from "../pages/UpdateProfile";
import CartPage from "../pages/CartPage";
import Login from "../components/Login";
import Users from "../pages/Admin/Users";
import Dashboard from "../pages/Admin/Dashboard";
import DashboardLayOut from "../layout/DashboardLayout";

// Define the router configuration
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/user-profile" element={<UpdateProfile />} />
        </Route>
        <Route path="/signup" element={<SignUp type="sign-up" />} />
        <Route path="/signin" element={<Login type="sign-in" />} />
        <Route path="dashboard" element={<DashboardLayOut />}>
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
