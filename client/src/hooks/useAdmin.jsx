import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: isAdmin,
    isLoading: isAdminLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["isAdmin", user?.email], // Use array to include user email as part of the key
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/admin/${user?.email}`);
      return response.data?.admin;
    },
    enabled: !!user?.email, // Ensure the query does not run until the email is available
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

  return { isAdmin, isAdminLoading };
};

export default useAdmin;
