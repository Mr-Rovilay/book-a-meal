import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast"; // Import toast from react-hot-toast
import Button from "../components/Button";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  let user = true;

  const handleDelete = (item) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn bg-red hover:bg-red ml-2 text-white",
        cancelButton: "btn bg-green hover:bg-green text-white",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/carts/${item.id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                refetch();
                // Use toast.success to show a success message
                toast.success("Item has been deleted successfully...", {
                  duration: 3000, // Optional: Specify duration
                });
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your item is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="section-container mx-auto xl:px-24 px-4">
      <Toaster /> {/* Place the toaster component here */}
      {/* banner */}
      <div className="section-container">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The<span className="text-green"> Cart</span>
            </h2>
          </div>
        </div>
      </div>
      {/* cart table */}
      <div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-green text-white rounded-sm text-xl">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td>
                      <button className="btn btn-xs">-</button>
                      <input
                        type="number"
                        value={"quantity"}
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                      />
                      <button className="btn btn-xs">+</button>
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        className="btn btn-sm border-none text-red bg-transparent"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
        </div>
        <hr />
        <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Customer Details</h3>
            <p>Name: {user?.displayName || "None"}</p>
            <p>Email: {user?.email}</p>
            <p>
              User_id:<span className="text-sm">{user?.uid}</span>
            </p>
            <p>Address: {user?.address}</p>
          </div>
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Shopping Details</h3>
            <p>Total Items: {totalItems}</p>
            <p>
              Total Price: <span id="total-price">${totalPrice}</span>
            </p>
            <Link to="/delivery-info">
              <div className="mt-4">
                <Button text={"proceed to checkout"} />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-20">
        <p>Cart is empty. Please add products.</p>
        <div className="flex items-center justify-center mt-4">
          <Link to="/menu">
            <Button text={"back to menu"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
