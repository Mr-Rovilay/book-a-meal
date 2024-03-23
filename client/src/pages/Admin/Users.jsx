import { FaTrashAlt, FaUser, FaUsers } from "react-icons/fa";

const Users = () => {
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Users</h5>
        <h5>Total Users: 5</h5>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-grey text-black rounded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>name</td>
                <td>email</td>
                <td>
                  <button className="btn btn-xs btn-circle bg-indigo-500 text-white">
                    <FaUsers />
                  </button>
                </td>
                <td>
                  <button className="btn btn-xs bg-orange-500 text-white">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
