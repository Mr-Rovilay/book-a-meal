import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { UserContext } from "../router/Router";
import { profileDataStructure } from "../pages/UserProfile";
import toast from "react-hot-toast";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  // let [user, setUser] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  // let { id: profileId } = useParams();

  // let [profile, setProfile] = useState(profileDataStructure);
  // let [loading, setLoading] = useState(true);

  // let {
  //   personal_info: {
  //     fullname,
  //     username: profile_username,
  //     profile_img,
  //     address,
  //   },
  //   social_links,
  //   joinedAt,
  // } = profile;

  const {
    userAuth,
    userAuth: { access_token },
  } = useContext(UserContext);
  // console.log(userAuth);

  const addToCart = (item) => {
    if (userAuth && userAuth?.username) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        username: userAuth.username,
      };
      // console.log(cartItem);

      fetch(import.meta.env.VITE_SERVER_DOMAIN + "/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => {
          if (!res.ok) {
            toast.error("Failed to add item to cart");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          // Optionally, you can provide feedback to the user that the item was added to the cart successfully
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
          // Optionally, you can provide feedback to the user that there was an error adding the item to the cart
        });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div
      to={`/menu/${item._id}`}
      className="card shadow-xl mr-5 relative md:my-2"
    >
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-red" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt={item.name}
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm">$</span>
            {item.price}
          </h5>
          <div className="" onClick={() => addToCart(item)}>
            <Button text={"add to cart"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
