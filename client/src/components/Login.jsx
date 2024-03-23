import React from "react";
import { Link } from "react-router-dom";
import InputBox from "./InputBox";
import googleIcon from "/imgs/google.png";
import { useNavigate } from "react-router-dom";

const Login = ({ type }) => {
  const navigate = useNavigate();
  const from = "/"; // default path

  const handleSubmit = (event) => {
    event.preventDefault();

    if (type === "sign-in") {
      // Sign-in logic
    } else {
      // Sign-up logic
    }

    document.getElementById("my_modal_5").close();
    navigate(from, { replace: true });
  };

  return (
    <div className="section-container max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className=" section-container h-cover flex items-center justify-center mt-16">
        <form
          id="formElement"
          onSubmit={handleSubmit}
          className="w-[80%] max-w-[400px]"
        >
          <h1 className="text-4xl font-gelasio text-green capitalize text-center mb-16 ">
            {type && type === "sign-in" ? "" : "Welcome Back"}
          </h1>

          <InputBox
            name={"email"}
            type={"email"}
            placeholder={"Email"}
            icon={"fi-rr-envelope"}
          />
          <InputBox
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            icon={"fi-rr-password"}
          />
          <button
            className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out w-full"
            type="submit"
          >
            {" "}
            Submit
            {type && type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10  uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out w-full">
            {" "}
            <img src={googleIcon} alt="" className="w-5" />
            Continue with Google
          </button>

          <p className="mt-6 text-dark-grey text-xl text-center">
            {type && type === "sign-in"
              ? "Don't have an account?"
              : "Already a Member ?"}{" "}
            <Link
              to={type && type === "signup" ? "/signup" : "/signup"}
              className="underline text-black text-xl ml-1"
            >
              {type && type === "sign-in" ? "Join us Today" : "Sign in here"}
            </Link>
          </p>
        </form>
        <button
          htmlFor="my_modal_5"
          onClick={() => document.getElementById("my_modal_5").close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Login;
