import React from "react";
import { Link } from "react-router-dom";
import InputBox from "./InputBox";
import googleIcon from "/imgs/google.png";

const Model = ({ type }) => {
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white border border-white">
        <div className="h-cover flex items-center justify-center border border-white">
          <form id="formElement" className="w-[80%] max-w-[400px]">
            <h1 className="text-4xl font-gelasio text-green capitalize text-center mb-16 ">
              {type === "sign-in" ? "" : "Welcome Back"}
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
              {type === "sign-in" ? "" : "Don't have an account?"}{" "}
              <Link
                to={type === "signup" ? "/signup" : "/signup"}
                className="underline text-black text-xl ml-1"
              >
                {type === "sign-in" ? "" : "Join us Today"}
              </Link>
            </p>
          </form>
          <Link
            htmlFor="my_modal_5"
            onClick={() => document.getElementById("my_modal_5").close()}
            className="btn btn-sm btn-circle btn-ghost px-6 hover:bg-grey hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out absolute right-2 top-2"
          >
            ✕
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default Model;
