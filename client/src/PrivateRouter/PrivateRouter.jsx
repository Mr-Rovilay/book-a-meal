import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { UserContext } from "../router/Router";

const PrivateRouter = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const location = useLocation();

  if (loading) {
    return <Loading />;
  }
  if (access_token) {
    return children;
  }
  return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;
