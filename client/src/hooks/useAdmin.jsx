import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: isAdmin,
    isPending: isAdminLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [user?.username, "isAdmin"],
    queryFn: async () => {
      // No need to check for user?.email here; React Query's enabled option takes care of it

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN} + /users/admin/${user.username}`
      ); // Since the query is "enabled" only if user?.email is truthy, we can directly access user.email here
      console.log(response.data?.admin);
      return response.data?.admin;
    },
    enabled: !!user?.username, // Ensure the query does not run until the email is available
    onError: (err) => {
      // Handle error by displaying a toast message or another method
      toast.error("Error checking admin status. Please try again.");
      console.error(err);
    },
  });

  // Use isError and error to provide feedback or log errors
  if (isError) {
    console.error("Error fetching admin status:", error);
  }

  console.log(isAdmin);
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
