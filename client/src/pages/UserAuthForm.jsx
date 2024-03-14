import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";
import googleIcon from "../imgs/google.png";
import facebook from "/assets/facebook.png";
import AnimationWrapper from "../common/AnimationWrapper";

const UserAuthForm = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form action="" className="w-[100%] max-w-[600px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mt-24 pb-9 text-green">
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
            " "
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
            icon={"fi-rr-password"}
          />
          <button className="btn-green center mt-14" type="submit">
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <div className="flex flex-col gap-4">
            <button className="btn-green flex items-center justify-center gap-4 w-[90%] center">
              {" "}
              <img src={googleIcon} alt="" className="w-5" />
              Continue with Google
            </button>
            <button className="btn-green flex items-center justify-center gap-4 w-[90%] center">
              {" "}
              <img src={facebook} alt="" className="w-5" />
              Continue with Facebook
            </button>
          </div>

          {type == "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              {" "}
              Don't have an account?
              <Link
                to={"/signup"}
                className="underline decoration-black text-black text-xl ml-1"
              >
                Create Account Here
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              {" "}
              Already a Member ? {""}
              <Link
                to={"/signin"}
                className="underline decoration-black text-black text-xl ml-1"
              >
                Sign in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
