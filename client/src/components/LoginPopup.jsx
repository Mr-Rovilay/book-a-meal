import { useState } from "react";
import { FaXmark, FaEye, FaEyeSlash } from "react-icons/fa6";

const LoginPopup = ({ setShowLogin }) => {
  const [state, setState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log(`${state} form submitted`, formData);
      // Handle form submission logic here
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="h-screen fixed w-full z-50 flexCenter bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg w-full max-w-[400px] shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
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
                className={`bg-gray-200 border p-2 pl-4 rounded-md outline-none w-full ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
               
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`bg-gray-200 border p-2 pl-4 rounded-md outline-none w-full ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`bg-gray-200 border p-2 pl-4 rounded-md outline-none w-full ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </div>

        <button
          className="bg-secondary text-white p-2 rounded-md mt-4 w-full"
          type="submit"
        >
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="text-center text-sm text-gray-600 mt-4">
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-secondary cursor-pointer"
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-secondary cursor-pointer"
              >
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
