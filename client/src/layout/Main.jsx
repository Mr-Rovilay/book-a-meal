import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="">
      <>
        <Navbar />
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="min-h-screen">
            <Outlet />
          </div>
        )}
        <Footer />
      </>
    </div>
  );
};

export default Main;
