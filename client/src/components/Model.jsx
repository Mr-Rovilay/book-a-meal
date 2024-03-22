import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Model = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form className="card-body" method="dialog">
            <h3 className="text-4xl font-gelasio capitalize text-center pb-9 text-green">
              Please Login
            </h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-white"
                required
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
                required
              />
              <label className="label mt-2">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
              />
            </div>
            <p className="text-center my-2">
              Dont Have an account?{" "}
              <Link
                to="/signup"
                className="underline text-red ml-1"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Sign up
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
      </div>
    </dialog>
  );
};

export default Model;
