import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import Model from "./Model";
// import { AuthContext } from "../contexts/AuthProvider";
// import { useContext } from "react";

const SignUp = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const { createUser, login } = useContext(AuthContext);

  // const location = useLocation();
  // const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/";

  // const onSubmit = (data) => {
  //   const email = data.email;
  //   const password = data.password;
  //   createUser(email, password)
  //     .then((result) => {
  //       // Signed up
  //       const user = result.user;
  //       alert("Account creation successfully done!");
  //       document.getElementById("my_modal_5").close();
  //       navigate(from, { replace: true });
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });
  // };
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="modal-box bg-white">
        <div className="modal-action flex flex-col justify-center">
          <form
            className="card-body"
            method="dialog"
            // onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-4xl font-gelasio capitalize text-center justify-center pb-9 text-green">
              Please Register
            </h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered bg-white"
                // {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered bg-white"
                // {...register("password")}
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Sign Up"
                className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
              />
            </div>
            <p className="text-center my-2">
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
          <hr className="mb-5" />
          <div className="text-center space-x-3 mb-5">
            <button className="btn btn-ghost btn-circle">
              <FaGoogle />
            </button>
            <button className="btn btn-ghost btn-circle">
              <FaFacebookF />
            </button>
            <button className="btn btn-ghost btn-circle">
              <FaGithub />
            </button>
          </div>
        </div>
        <Model />
      </div>
    </div>
  );
};

export default SignUp;
