import { Link, Navigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import googleIcon from "/imgs/google.png";
import AnimationWrapper from "../common/AnimationWrapper";

const UserAuthForm = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="section-container my-20 flex items-center justify-center">
        <form
          id="formElement"
          action=""
          className="md:modal-box w-[80%] max-w-[400px]"
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-16 text-green">
            {type == "sign-in" ? "Welcome Back" : "Join Us Today"}
          </h1>
          {type != "sign-in" ? (
            <InputBox
              name={"fullname"}
              type={"text"}
              placeholder={"Full Name"}
              icon={"fi-rr-user"}
            />
          ) : (
            ""
          )}
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
            className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center w-full hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
            type="submit"
          >
            {type.replace("-", " ")}
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

          {type == "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              {" "}
              Don't have an account?
              <Link
                to={"/signup"}
                className="underline text-black text-xl ml-1"
              >
                Join us Today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              {" "}
              Already a Member ? {""}
              <Link
                to={"/signin"}
                className="underline text-black text-xl ml-1"
              >
                Sign in here
              </Link>
            </p>
          )}
        </form>
        <Link
          to={"/"}
          htmlFor="my_modal_5"
          onClick={() => document.getElementById("my_modal_5").close()}
          className="btn btn-sm btn-circle btn-ghost px-6 hover:bg-grey hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out absolute right-2 top-2"
        >
          ✕
        </Link>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
