import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from "/imgs/google.png";
import Model from "./Model";
import InputBox from "./InputBox";

const SignUp = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="modal-box bg-white w-full">
        <div className="modal-action flex flex-col justify-center">
          <form className="card-body" method="dialog">
            <h3 className="text-4xl font-gelasio capitalize text-center justify-center text-green">
              Please Register
            </h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <InputBox
                name={"name"}
                type={"text"}
                placeholder={"Full Name"}
                icon={"fi-rr-user"}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <InputBox
                name={"email"}
                type={"email"}
                placeholder={"Email"}
                icon={"fi-rr-envelope"}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <InputBox
                name={"password"}
                type={"password"}
                placeholder={"Password"}
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Sign Up"
                className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
              />
            </div>
            <div className="relative w-full flex items-center gap-2 my-5 uppercase text-black font-bold">
              <hr className="w-1/2 border-black" />
              <p>or</p>
              <hr className="w-1/2 border-black" />
            </div>

            <button className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out w-full">
              {" "}
              <img src={googleIcon} alt="" className="w-5" />
              Continue with Google
            </button>

            <p className="text-center">
              Have an account?{" "}
              <button
                className="underline text-red ml-1"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Sign In
              </button>
            </p>
            <Link
              to={"/"}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>
          </form>
        </div>
        <Model />
      </div>
    </div>
  );
};

export default SignUp;
