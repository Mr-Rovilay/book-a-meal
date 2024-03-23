import { useState } from "react";
import Loading from "../components/Loading";
import profile from "/assets/team_member_4.png";
import Button from "../components/Button";
import { CiUser } from "react-icons/ci";
import InputBox from "../components/InputBox";

const social_links = {
  youtube: {
    key: 0,
    type: String,
    default: "",
  },
  instagram: {
    key: 1,
    type: String,
    default: "",
  },
  facebook: {
    key: 2,
    type: String,
    default: "",
  },
  twitter: {
    key: 3,
    type: String,
    default: "",
  },
  github: {
    key: 4,
    type: String,
    default: "",
  },
  website: {
    key: 5,
    type: String,
    default: "",
  },
};

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="section-container my-20">
      {loading ? (
        <Loading />
      ) : (
        <form>
          <h1 className="max-md:hidden">Profile</h1>
          <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
            <div className="max-lg:center mb-5 flex flex-col gap-2">
              <label
                htmlFor="uploadImg"
                id="profileImgLabel"
                className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden"
              >
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/80 opacity-0 hover:opacity-100 cursor-pointer">
                  Upload Image
                </div>
                <img src={profile} alt="" />
              </label>
              <input
                type="file"
                id="uploadImg"
                accept=".jpeg, .png, .jpg"
                hidden
              />
              <Button text={"Upload"} />
            </div>
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <div className="">
                  <InputBox
                    type="text"
                    name="Full Name"
                    placeholder="Full Name"
                    icon={<CiUser />}
                  />
                </div>
                <div className="">
                  <InputBox
                    type="text"
                    name="email"
                    placeholder="Email"
                    icon={<CiUser />}
                  />
                </div>
              </div>
              <InputBox
                type="text"
                name="username"
                placeholder="Username"
                icon={<CiUser />}
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
                    />
                  );
                })}
              </div>
              <Button type="submit" text={"Update"} />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;
