import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import SignUp from "../components/SignUp";
// import UpdateProfile from "../pages/dashboard/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      // {
      //   path: "/update-profile",
      //   element: <UpdateProfile />,
      // },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
