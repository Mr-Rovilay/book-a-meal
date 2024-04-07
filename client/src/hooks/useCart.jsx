import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../router/Router";
import toast from "react-hot-toast";

const useCart = () => {
  const {
    userAuth,
    userAuth: { access_token },
  } = useContext(UserContext);

  const {
    data: cart = [],
    refetch,
    error,
    isError,
  } = useQuery({
    queryKey: ["carts", userAuth?.username],
    queryFn: async () => {
      if (!userAuth?.username) {
        // Optionally handle the case when username is not available.
        toast.error("Username is undefined");
      }
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_DOMAIN}/carts?username=${
          userAuth.username
        }`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!res.ok) {
        toast.error("Network response was not ok");
      }

      return res.json();
    },
    enabled: !!userAuth.username, // This ensures the query runs only if username is not falsy
  });

  // Handling or logging the error if needed
  if (isError) {
    console.error(error);
  }

  return [cart, refetch];
};

export default useCart;
