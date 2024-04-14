import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Button from "../components/Button";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../router/Router";
import { profileDataStructure } from "./UserProfile";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [cartItems, setCartItems] = useState([]);

  let { userAuth } = useContext(UserContext);

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  // Handle quantity increase
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_DOMAIN}/carts/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: item.quantity + 1 }),
        }
      );

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        toast.error("Failed to update quantity");
      }
    } catch (error) {
      toast.error("Error updating quantity:", error);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_DOMAIN}/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          toast.error("Failed to update quantity");
        }
      } catch (error) {
        toast.error("Error updating quantity:", error);
      }
    } else {
      toast.error("Item can't be zero");
    }
  };

  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;
  // console.log(orderTotal)

  const handleDelete = async (item) => {
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
            `${import.meta.env.VITE_SERVER_DOMAIN}/carts/${item._id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            await refetch(); // Refetch cart
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
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={() => console.log(item.quantity)}
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>{calculateTotalPrice(item).toFixed(2)}</td>
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
            <p className="capitalize">Name: {userAuth?.fullname || "None"}</p>
            <p>Email: {userAuth?.email}</p>
            <p>
              User_id:<span className="text-xl bold"> {userAuth?.id}</span>
            </p>
            <p>Address: {userAuth?.address || "Not provided"}</p>
          </div>
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-lg font-semibold">Shopping Details</h3>
            <p>Total Items: {totalItems}</p>
            <p>
              Total Price:{" "}
              <span id="total-price">${orderTotal.toFixed(2)}</span>
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
        {cart.length === 0 && <p>Cart is empty. Please add products.</p>}
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
