import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { UserContext } from "../../router/Router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [loadingUser, setLoadingUser] = useState(null);

  const {
    data: users = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  const handleMakeAdmin = async (user) => {
    try {
      await axiosSecure.patch(`/users/admin/${user._id}`);
      toast.success(`${user.fullname} is now an admin`);
      await refetch();
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error("Failed to make user an admin. Please try again.");
    }
  };
  if (isLoading) return <div>Loading...</div>; // Show loading indicator
  if (isError) return <div>Error loading data. Please try again.</div>;

  // delete
  const handleDeleteUser = async (userId) => {
    setLoadingUser(userId); // Set loading state for specific user

    try {
      await axiosSecure.delete(`/users/${userId}`);
      toast.success("User deleted successfully");
      // Refetch user data after deletion
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setLoadingUser(null); // Reset loading state
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <Toaster />
        <h5>All Users</h5>
        <h5>Total Users: {users.length}</h5>{" "}
        {/* Display total number of users */}
      </div>

      {/* Render table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[870px]">
          {/* Table head */}
          <thead className="bg-green text-white rounded-lg text-xl">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamically render user rows */}
            {users.map((user, index) => (
              <tr key={index} className="bg-grey">
                <td>{index + 1}</td>{" "}
                {/* Increment index by 1 for readability */}
                <td className="capitalize">{user.fullname}</td>{" "}
                {/* Render user name */}
                <td>{user.email}</td> {/* Render user email */}
                <td>
                  {/* Render user role icon */}

                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-circle bg-twitter hover:bg-twitter text-white"
                      disabled={loadingUser === user._id}
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td>
                  {/* Render delete button */}
                  <button
                    className="btn bg-orange-500 bg-red text-white hover:bg-red"
                    onClick={() => handleDeleteUser(user._id)}
                    disabled={loadingUser === user._id} // Disable button while loading
                  >
                    {loadingUser === user._id ? "Deleting..." : <FaTrashAlt />}
                  </button>

                  {/* <button className="btn bg-orange-500 bg-red text-white hover:bg-red ">
                    <FaTrashAlt />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
