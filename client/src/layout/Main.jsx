import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Loading from "../components/Loading";

const Main = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div className="bg-white">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Main;
