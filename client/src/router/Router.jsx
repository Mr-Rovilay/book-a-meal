// Import necessary dependencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import SignUp from "../components/SignUp";
import UpdateProfile from "../pages/UpdateProfile";

// Define the router configuration
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="user-profile" element={<UpdateProfile />} />
        </Route>
        <Route path="/signup" element={<SignUp type="sign-up" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
