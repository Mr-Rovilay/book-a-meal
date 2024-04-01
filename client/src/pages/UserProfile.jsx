import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../router/Router";

export const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    address: "",
  },
  social_links: {},
  joinedAt: " ",
};

const UserProfile = () => {
  let { id: profileId } = useParams();

  let [profile, setProfile] = useState(profileDataStructure);
  let [loading, setLoading] = useState(true);

  let {
    personal_info: {
      fullname,
      username: profile_username,
      profile_img,
      address,
    },
    social_links,
    joinedAt,
  } = profile;

  let {
    userAuth: { username },
  } = useContext(UserContext);

  const fetchUserProfile = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
        username: profileId,
      })
      .then(({ data: user }) => {
        setProfile(user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    resetStates();
    fetchUserProfile();
  }, [profileId]);

  const resetStates = () => {
    setProfile(profileDataStructure);
    setLoading(true);
  };
  return (
    <div className="flex flex-col text-center items-center justify-center gap-5  mt-52">
      <img
        src={profile_img}
        alt=""
        className="w-48 h-48 gb-grey rounded-full md:w-32 md:h-32"
      />
      <h1 className="text-2xl font-medium">@{profile_username}</h1>
      <p className="text-xl capitalize h-6">{fullname}</p>
      <p className="flex flex-start items-start justify-start"></p>

      <div className="flex gap-4 mt-2">
        {profileId == username ? (
          <Link
            to={`/edit-profile/${username}`}
            className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
          >
            Edit profile
          </Link>
        ) : (
          " "
        )}
      </div>
      <div className="text-xl leading-7">
        {" "}
        Address: {""}
        {address ? address : "No Address"}
      </div>
      <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey">
        {Object.keys(social_links).map((key) => {
          let link = social_links[key];
          return link ? (
            <Link to={link} target="_blank" key={key}>
              <i
                className={
                  "fi " +
                  (key !== "website" ? "fi-brands-" + key : "fi-rr-globe") +
                  " text-2xl hover:text-black "
                }
              ></i>
            </Link>
          ) : (
            " "
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
