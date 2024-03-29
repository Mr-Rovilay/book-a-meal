import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import img from "/imgs/p5.png";

const ManageItems = () => {
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Menu Items</span>
      </h2>
      {/* menu item table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table text-xl">
            {/* head */}
            <thead className="bg-green text-white rounded-lg text-xl">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={img} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>name</td>
                <td>price</td>
                <td>
                  <Link to={`/dashboard/update-menu/:id`}>
                    <button className="btn btn-ghost btn-xs text-twitter text-xl ">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs text-red text-xl">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>

              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
