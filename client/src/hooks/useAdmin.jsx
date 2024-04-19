import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../router/Router";

export const u = 12;

const useAdmin = () => {
  let { userAuth } = useContext(UserContext);
  const {
    refetch,
    data: isAdmin,
    isPending: isAdminLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [userAuth?.username, "isAdmin"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN} + /users/admin/${userAuth.email}`
      );
      console.log(response.data?.admin);
      return response.data?.admin;
    },
    enabled: !!userAuth?.email,
    onError: (err) => {
      toast.error("Error checking admin status. Please try again.");
      console.error(err);
    },
  });
  if (isError) {
    console.error("Error fetching admin status:", error);
  }

  console.log(userAuth.email);
  console.log(isAdmin);
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
