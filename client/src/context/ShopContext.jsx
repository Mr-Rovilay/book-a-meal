import { createContext, useState } from "react";
import { all_products } from "../assets/data";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const updatedCart = { ...prev };
        delete updatedCart[itemId]; // Remove the item completely if the quantity becomes 0
        return updatedCart;
      }
    });
  };


  // Get total number of items in the cart
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (let item in cartItems) {
      totalItems += cartItems[item];
    }
    return totalItems;
  };

  // Get total amount of the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (let item in cartItems) {
      const itemInfo = all_products.find((p) => p._id === item);
    
        totalAmount += itemInfo.price * cartItems[item];
      
    }
    return totalAmount;
  };

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
