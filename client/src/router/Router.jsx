// Import necessary dependencies
import { Router, Routes, Route } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import SignUp from "../components/SignUp";
import UpdateProfile from "../pages/UpdateProfile";
import CartPage from "../pages/CartPage";
import Login from "../components/Login";
import Users from "../pages/Admin/Users";
import Dashboard from "../pages/Admin/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";

// Define the router configuration
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/user-profile" element={<UpdateProfile />} />
      </Route>
      <Route path="/signup" element={<SignUp type="sign-up" />} />
      <Route path="/sign-in" element={<Login type="sign-in" />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
