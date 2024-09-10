import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-[#222] text-white max-padd-container py-12 rounded-t-xl"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="flex flex-col items-center md:items-start">
          <Link to={"/"} className="mb-4 bold-24">
            <h3>
              Book<span className="text-secondary">a</span>Meal
            </h3>
          </Link>
          <p className="text-center md:text-left">
            At Book a Meal, we&apos;re
            passionate about delivering fresh, delicious meals right to your
            doorstep. Our goal is to make every dining experience convenient,
            enjoyable, and unforgettable. Whether you&apos;re ordering your
            favorite dish or trying something new, we strive to exceed your
            expectations with every meal. Thank you for choosing us as your
            trusted meal provider!
          </p>
        </div>
        <div className="flex flex-col items-start md:items-start">
          <h4 className="mb-4 bold-20">Quick links</h4>
          <ul className="space-y-2 regular-15 text-gray-30">
            <li className="">
              <Link to={"/"} className="hover:text-secondary">
                Home
              </Link>
            </li>
            <li className="">
              <Link to={"/"} className="hover:text-secondary">
                Categories
              </Link>
            </li>
            <li className="">
              <Link to={"/"} className="hover:text-secondary">
                Menu
              </Link>
            </li>
            <li className="">
              <Link to={"/"} className="hover:text-secondary">
                Foods
              </Link>
            </li>
            <li className="">
              <Link to={"/"} className="hover:text-secondary">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start md:items-start">
          <h4 className="mb-4 bold-20">Policies</h4>
          <ul className="space-y-2 regular-15 text-gray-30">
            <li className="">
              <Link to={"/"} className="hover:text-secondary">
                Terms of service
              </Link>
            </li>
            <li className="">
              <Link to={"/"} className="hover:text-secondary">
                Privacy Policy
              </Link>
            </li>
            <li className="">
              <Link to={"/"} className="hover:text-secondary">
                Shipping Policy
              </Link>
            </li>
            <li className="">
              <Link to={"/"} className="hover:text-secondary">
                Return policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-2 md:items-start">
          <h4 className="mb-4 bold-20">Contact us</h4>
          <p className="">
            Email:{" "}
            <a href="mailto:support@food.nc" className="hover:text-secondary">
              support@food.nc
            </a>
          </p>
          <p className="">
            Phone: <a href="tel:11234567" className="hover:text-secondary"></a>
            123455566
          </p>
          <p className="">Address:11234 street, london city, world wide</p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <hr className="h-[1px] w-full max-w-screen-md my-4 border-white" />
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} Book A Meal | All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
