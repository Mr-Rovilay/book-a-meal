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
import PaymentSuccess from "../pages/SuccessPage/PaymentSuccess";
import ManageBookings from "../pages/Admin/ManageBookings";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "../common/session";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UserProfile from "../pages/UserProfile";

export const UserContext = createContext({});

// Define the router configuration
const AppRouter = ({ type }) => {
  const [userAuth, setUserAuth] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <AnimationWrapper keyValue={type}>
      <ScrollToTop />
      <UserContext.Provider value={{ userAuth, setUserAuth, user, setUser }}>
        <Routes>
          {/* user route */}
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route
              path="/menu"
              element={
                <PrivateRouter>
                  {" "}
                  <Menu />
                </PrivateRouter>
              }
            />
            <Route path="/order" element={<Order />} />
            <Route path="/cart-page" element={<CartPage />} />
            <Route path="/edit-profile/:id" element={<UpdateProfile />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/delivery-info" element={<DeliveryInfo />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
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
            <Route path="manage-bookings" element={<ManageBookings />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </AnimationWrapper>
  );
};

export default AppRouter;
