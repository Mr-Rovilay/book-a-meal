import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { all_products, cartItems, removeFromCart, getTotalCartItems, getTotalCartAmount,url } = useContext(ShopContext);
  const navigate = useNavigate();

  const totalItems = getTotalCartItems();
  const totalAmount = getTotalCartAmount();
  const shippingFee = totalAmount > 0 ? 5 : 0;

  return (
    <section className="pt-20 max-padd-container">
      <div className="py-10">
        {totalItems > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="py-12 border-b border-slate-900/20 text-gray-30">
                <th className="p-1">Product</th>
                <th className="p-1">Title</th>
                <th className="p-1">Price</th>
                <th className="p-1">Qua</th>
                <th className="p-1">Total</th>
                <th className="p-1">Remove</th>
              </tr>
            </thead>
            <tbody>
              {all_products.map((product) => {
                if (cartItems[product._id] > 0) {
                  return (
                    <tr key={product._id} className="p-6 text-left border-b border-slate-900/20 text-gray-30">
                      <td className="p-1">
                        <img
                          src={url+"/images/"+product.image}
                          alt="productImg"
                          height={43}
                          width={43}
                          className="object-contain m-1 rounded-lg aspect-square ring-1"
                        />
                      </td>
                      <td className="">
                        <div className="line-clamp-1">
                        {product.name}
                        </div>
                        </td>
                      <td className="p-1">${product.price.toFixed(2)}</td>
                      <td className="p-1">{cartItems[product._id]}</td>
                      <td className="p-1">${(product.price * cartItems[product._id]).toFixed(2)}</td>
                      <td className="p-1">
                        <div
                          onClick={() => removeFromCart(product._id)}
                          className="text-red-500 cursor-pointer hover:text-red-700"
                        >
                          <FaTrashAlt />
                        </div>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>

      {totalItems > 0 && (
        <div className="py-5">
          <h4 className="mb-4 text-xl font-semibold">Summary</h4>
          <div className="flex justify-between mb-2">
            <h4 className="text-lg">SubTotal:</h4>
            <h4 className="text-lg">${totalAmount.toFixed(2)}</h4>
          </div>
          <hr className="mb-2" />
          <div className="flex justify-between mb-2">
            <h4 className="text-lg">Shipping Fee:</h4>
            <h4 className="text-lg">${shippingFee}</h4>
          </div>
          <hr className="mb-2" />
          <div className="flex justify-between text-lg font-bold">
            <h4>Total:</h4>
            <h4>${(totalAmount + shippingFee).toFixed(2)}</h4>
          </div>

          <button
            onClick={() => navigate("/order")}
            className="px-4 py-2 mt-4 text-white rounded-lg cursor-pointer bg-secondary"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </section>
  );
};

export default Cart;
