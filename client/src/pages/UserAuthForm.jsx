import { Link, Navigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import googleIcon from "/imgs/google.png";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import AnimationWrapper from "../common/AnimationWrapper";
import { storeInSession } from "../common/session";
import { useContext } from "react";
import { UserContext } from "../router/Router";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/router" + serverRoute,
        formData
      )
      .then(({ data }) => {
        storeInSession("urrrrrser", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type == "sign-in" ? "/signin" : "/signup";
    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    let form = new FormData(document.getElementById("formElement"));

    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Fullname must be at least 3 characters long");
      }
    }

    if (!email.length) {
      return toast.error("Enter email address");
    }
    if (!emailRegex.test(email)) {
      return toast.error("invalid email address");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "password should be 6 to 20 characters long with numeric, 1 lowercase and 1 uppercase letter"
      );
    }

    // send data to backend
    userAuthThroughServer(serverRoute, formData);
  };

  // firebase with google
  const handleGoogleAuth = (e) => {
    e.preventDefault();
    authWithGoogle()
      .then((user) => {
        let serverRoute = "/google-auth";
        let formData = {
          access_token: user.accessToken,
        };
        userAuthThroughServer(serverRoute, formData);
      })
      .error((err) => {
        toast.error("Trouble logging in through Google");
      });
  };

  return access_token ? (
    <Navigate to={"/"} />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-screen flex items-center justify-center">
        <Toaster />
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
            onClick={handleSubmit}
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10  uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            onClick={handleGoogleAuth}
            className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out w-full"
          >
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
