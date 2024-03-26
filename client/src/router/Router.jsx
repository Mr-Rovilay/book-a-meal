// Import necessary dependencies
import { Routes, Route } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import UpdateProfile from "../pages/UpdateProfile";
import CartPage from "../pages/CartPage";
import Users from "../pages/Admin/Users";
import Dashboard from "../pages/Admin/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import UserAuthForm from "../pages/UserAuthForm";
import AddMenu from "../pages/Admin/AddMenu";
import ManageItem from "../pages/Admin/ManageItem";
import UpdateMenu from "../pages/Admin/UpdateMenu";
import DeliveryInfo from "../pages/DeliveryInfo";
import Order from "../pages/Order";
import AnimationWrapper from "../common/AnimationWrapper";
import ScrollToTop from "../components/ScrollToTop";

// Define the router configuration
const AppRouter = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <ScrollToTop />
      <Routes>
        {/* user route */}
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/user-profile" element={<UpdateProfile />} />
          <Route path="/delivery-info" element={<DeliveryInfo />} />
        </Route>
        <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
        {/* Admin route*/}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="update-menu/:id" element={<UpdateMenu />} />
          <Route path="manage-items" element={<ManageItem />} />
        </Route>
      </Routes>
    </AnimationWrapper>
  );
};

export default AppRouter;
