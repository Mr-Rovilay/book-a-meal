import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import AnimationWrapper from "../common/AnimationWrapper";

const Footer = ({ type }) => {
  const year = new Date().getFullYear();
  return (
    <>
      <section className="section-container mt-20">
        <div className="py-6 border-t  border-t-green">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 text-center">
            <div className="space-y-6">
              <h1 className="title">Book Meal</h1>
              <div className="flex items-center justify-center">
                <p className="text-xl max-w-[300px]">
                  © {year} Your Mr Rovilay Meals. All rights reserved.
                </p>
              </div>
            </div>
            <div className="">
              <h1 className="title">Quick Links</h1>
              <div className="grid grid-cols-1 gap-3">
                <div className="">
                  <ul className="cursor-pointer">
                    <li className="">
                      <a
                        href="#"
                        className="text-xl hover:scale-105 duration-300 hover:text-green"
                      >
                        Home
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#"
                        className="text-xl hover:scale-105 duration-300 hover:text-green"
                      >
                        Menu
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#"
                        className="text-xl hover:scale-105 duration-300 hover:text-green"
                      >
                        Contact
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#"
                        className="text-xl hover:scale-105 duration-300 hover:text-green"
                      >
                        Category
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="title">Follow us</h1>
              <div className="">
                <p className="">08140570029</p>
                <p className="capitalize">
                  14 akinola osan street isuti road egan
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 cursor-pointer">
                <FaFacebook className="text-3xl hover:scale-105 duration-300 hover:text-green" />
                <FaInstagram className="text-3xl hover:scale-105 duration-30 hover:text-green" />
                <FaTelegram className="text-3xl hover:scale-105 duration-30 hover:text-green" />
                <FaGoogle className="text-3xl hover:scale-105 duration-30 hover:text-green" />
                <FaTwitter className="text-3xl hover:scale-105 duration-30 hover:text-green" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
