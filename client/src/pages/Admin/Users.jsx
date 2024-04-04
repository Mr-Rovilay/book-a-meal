import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../router/Router";

const Users = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(import.meta.env.VITE_SERVER_DOMAIN + "/users");
      return res.json();
    },
  });
  console.log(users);

  return (
    <div>
      <div className="flex items-center justify-between m-4">
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
                <td>{user.personal_info.fullname}</td> {/* Render user name */}
                <td>{user.personal_info.email}</td> {/* Render user email */}
                <td>
                  {/* Render user role icon */}

                  {user.personal_info.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button className="btn btn-xs btn-circle bg-twitter">
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td>
                  {/* Render delete button */}
                  <button className="btn btn-xs bg-orange-500 bg-red text-white">
                    <FaTrashAlt />
                  </button>
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
