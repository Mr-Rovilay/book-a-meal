import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../common/session";
import { useContext, useEffect } from "react";
import { UserContext } from "../router/Router";

const axiosSecure = axios.create({ baseURL: "http://localhost:3000" });

// Setting up interceptors outside the hook to avoid re-registration on every render
axiosSecure.interceptors.request.use(
  function (config) {
    const access_token = sessionStorage.getItem("access_token"); // Assuming 'token' is the key
    if (access_token) {
      config.headers.authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      logOutUser(); // Assuming this handles the logout process
      // Navigation should happen in the component or context managing the logout, not here
    }
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming logout leads to navigation, listen for changes in auth status
    // This logic may need adjustment based on your auth flow and state management
    const handleAuthChange = () => {
      navigate("/signin");
    };

    // Placeholder for setting up a real listener on auth state change
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      // Cleanup listener when component unmounts or auth changes
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
