import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../components/Button";

import InputBox from "../components/InputBox";
import { UserContext } from "../router/Router";
import { profileDataStructure } from "./UserProfile";
import { Toaster, toast } from "react-hot-toast";

import { uploadImage } from "../common/aws";
import { storeInSession } from "../common/session";

const UpdateProfile = () => {
  const [loading, setLoading] = useState(true);
  const {
    userAuth,
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  let profileImgElement = useRef();
  let editProfileForm = useRef();
  let addressLimit = 100;

  const [profile, setProfile] = useState(profileDataStructure);
  const [updatedProfileImg, setUpdatedProfileImg] = useState(null);
  let {
    personal_info: {
      fullname,
      username: profile_username,
      profile_img,
      email,
      address,
    },
    social_links,
  } = profile;

  useEffect(() => {
    if (access_token) {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
          username: userAuth.username,
        })
        .then(({ data }) => {
          setProfile(data);
        })
        .catch(({ response }) => {
          toast.error(response.data.error);
        });
    }
  }, [access_token]);

  const handlePreview = (e) => {
    let img = e.target.files[0];
    profileImgElement.current.src = URL.createObjectURL(img);
    setUpdatedProfileImg(img);
  };

  const handleImgUpload = (e) => {
    e.preventDefault();
    if (updatedProfileImg) {
      let loadingToast = toast.loading("Uploading....");
      e.target.setAttribute("disable", true);
      uploadImage(updatedProfileImg)
        .then((url) => {
          if (url) {
            axios
              .post(
                import.meta.env.VITE_SERVER_DOMAIN + "/update-profile-img",
                { url },
                {
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                  },
                }
              )
              .then(({ data }) => {
                let newUserAuth = {
                  ...userAuth,
                  profile_img: data.profile_img,
                };
                storeInSession("user", JSON.stringify(newUserAuth));
                setUserAuth(newUserAuth);

                setUpdatedProfileImg(null);

                toast.dismiss(loadingToast);
                e.target.removeAttribute("disabled");
                toast.success("Uploaded");
              })
              .catch(({ response }) => {
                toast.dismiss(loadingToast);
                e.target.removeAttribute("disabled");
                toast.error(response.data.error);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let form = new FormData(editProfileForm.current);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    let { username, address, instagram, facebook, twitter, github } = formData;

    if (username.length < 3) {
      return toast.error("Username should be at least 3 letters long");
    }

    if (address.length > addressLimit) {
      return toast.error(
        `Address should not be more than ${addressLimit} characters`
      );
    }

    let loadingToast = toast.loading("Updating......");
    e.target.setAttribute("disabled", true);

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/update-profile",
        {
          username,
          address,
          social_links: { instagram, facebook, twitter, github },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        if (userAuth.username !== data.username) {
          let newUserAuth = { ...userAuth, username: data.username };
          storeInSession("user", JSON.stringify(newUserAuth));
          setUserAuth(newUserAuth);
        }

        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        toast.success("Profile Updated");
      })
      .catch(({ response }) => {
        toast.dismiss(loadingToast);
        e.target.removeAttribute("disabled");
        toast.error(response.data.error);
      });
  };

  return (
    <div className="section-container my-20">
      <form ref={editProfileForm}>
        <h1 className="max-md:hidden text-2xl my-8">Edit Profile</h1>
        <Toaster />
        <div className="flex flex-col items-center justify-center lg:flex-row py-10 gap-8 lg:gap-10">
          <div className="max-lg:center mb-5 flex flex-col gap-2">
            <label
              htmlFor="uploadImg"
              id="profileImgLabel"
              className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden"
            >
              <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/80 opacity-0 hover:opacity-100 cursor-pointer">
                Upload Image
              </div>
              <img src={profile_img} alt="" ref={profileImgElement} />
            </label>
            <input
              type="file"
              id="uploadImg"
              accept=".jpeg, .png, .jpg"
              hidden
              onChange={handlePreview}
            />
            <button
              onClick={handleImgUpload}
              className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 w-auto text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
            >
              Upload
            </button>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
              <div className="">
                <InputBox
                  type="text"
                  name="Full Name"
                  value={fullname}
                  placeholder="Full Name"
                  icon="fi-rr-user"
                />
              </div>
              <div className="">
                <InputBox
                  type="text"
                  value={email}
                  name="email"
                  placeholder="Email"
                  icon="fi-rr-envelope"
                />
              </div>
            </div>
            <InputBox
              type="text"
              name="username"
              value={profile_username}
              placeholder="Username"
              icon="fi-rr-user"
            />
            <InputBox
              type="text"
              name="address"
              value={address}
              placeholder="Address"
              icon="fi-rr-at"
            />
            <div className="md:grid md:grid-cols-2 gap-x-6">
              {Object.keys(social_links).map((key, i) => {
                let link = social_links[key];
                return (
                  <InputBox
                    key={i}
                    name={key}
                    type="text"
                    value={link}
                    placeholder="https://"
                    icon={
                      "fi " +
                      (key !== "website" ? "fi-brands-" + key : "fi-rr-globe")
                    }
                  />
                );
              })}
            </div>
            <button
              onClick={handleSubmit}
              className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 w-auto text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
