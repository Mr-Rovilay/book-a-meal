import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import useMenu from "../../hooks/useMenu";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const handleDeleteItem = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_DOMAIN}/menu/${item._id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            refetch(); // Refetch cart
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          } else {
            toast.error("Failed to delete cart item.");
          }
        } catch (error) {
          toast.error(`Error deleting item: ${error.message}`);
        }
      }
    });
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <Toaster />
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
              {menu.map((item, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>N{item.price}</td>
                  <td>
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="btn btn-ghost btn-xs text-twitter text-xl ">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs text-red text-xl"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}

              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
