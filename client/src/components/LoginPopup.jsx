import { useContext, useState } from "react";
import { FaXmark, FaEye, FaEyeSlash } from "react-icons/fa6";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(ShopContext);
  const [state, setState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};

    if (state === "Sign Up" && !formData.name.trim()) {
      formErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      setErrors({});
      try {
        const endpoint = state === "Login" ? "api/user/login" : "api/user/register";
        const response = await axios.post(`${url}/${endpoint}`, formData);

        if ((response.status === 200 || response.status === 201) && response.data.token) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(`${state} successful!`);
          setShowLogin(false);
        } else {
          throw new Error("No token received");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
        toast.error(errorMessage);
        setErrors({ submit: errorMessage });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="fixed z-50 w-full h-screen bg-black bg-opacity-50 flexCenter" onClick={() => setShowLogin(false)}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white p-8 m-3 rounded-lg w-full max-w-[400px] shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-semibold">{state}</h4>
          <FaXmark onClick={() => setShowLogin(false)} className="cursor-pointer" />
        </div>

        <div className="flex flex-col gap-4">
          {state === "Sign Up" && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className={`bg-gray-200 border p-2 pl-4 rounded-md outline-none w-full ${errors.name ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`bg-gray-200 border p-2 pl-4 rounded-md outline-none w-full ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`bg-gray-200 border p-2 pl-4 rounded-md outline-none w-full ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            <span className="absolute right-3 top-2.5 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
        </div>

        <button className={`bg-secondary text-white p-2 rounded-md mt-4 w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : (state === "Sign Up" ? "Create account" : "Login")}
        </button>

        <div className="mt-4 text-sm text-center text-gray-600">
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => { setState("Login"); setFormData({ name: "", email: "", password: "" }); }} className="cursor-pointer text-secondary">
                Login
              </span>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <span onClick={() => { setState("Sign Up"); setFormData({ name: "", email: "", password: "" }); }} className="cursor-pointer text-secondary">
                Create account
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
