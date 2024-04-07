import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../router/Router";

export const profileDataStructure = {
  personal_info: {
    fullname: "",
    email: "",
    username: "",
    profile_img: "",
    address: "",
  },
  social_links: {},
  joinedAt: "",
};

const UserProfile = () => {
  const { id: profileId } = useParams();
  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    userAuth: { username },
  } = useContext(UserContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const serverDomain =
          import.meta.env.VITE_SERVER_DOMAIN || "http://localhost:3000";
        const { data: user } = await axios.post(`${serverDomain}/get-profile`, {
          username: profileId,
        });
        setProfile(user);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [profileId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const {
    personal_info: {
      fullname,
      username: profileUsername,
      profile_img,
      email,
      address,
      role,
    },
    social_links,
  } = profile;

  return (
    <div className="flex flex-col text-center items-center justify-center gap-5 mt-52">
      <img
        src={profile_img}
        alt={fullname}
        className="w-48 h-48 gb-grey rounded-full md:w-32 md:h-32"
      />
      <h1 className="text-2xl font-medium">@{profileUsername}</h1>
      <p className="text-xl capitalize h-6">{fullname || "No Name"}</p>
      <p className="text-xl h-6">{email || "No email"}</p>
      <p className="text-xl h-6">{role || "No role"}</p>

      {profileId === username && (
        <Link
          to={`/edit-profile/${username}`}
          className="btn capitalize bg-green border-green rounded-xl font-semibold px-6 text-white flex items-center gap-2 hover:bg-dark-green hover:bg-opacity-80 focus:scale-95 transition-all duration-200 ease-out"
        >
          Edit profile
        </Link>
      )}

      <div className="text-xl leading-7">
        Address: {address || "No Address"}
      </div>
      <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey">
        {Object.entries(social_links).map(
          ([key, link]) =>
            link && (
              <Link to={link} target="_blank" key={key}>
                <i
                  className={`fi ${
                    key !== "website" ? `fi-brands-${key}` : "fi-rr-globe"
                  } text-2xl hover:text-black`}
                ></i>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default UserProfile;
