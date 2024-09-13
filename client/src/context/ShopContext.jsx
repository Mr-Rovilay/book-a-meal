import { createContext, useEffect, useState } from "react";
import axios from "axios";  


export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const url ="https://book-a-meal.onrender.com"
  const [cartItems, setCartItems] = useState({});
  const [all_products, setAll_products] = useState([]);
  const [token, setToken] = useState("");

  // Add to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    // Update cart locally
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const updatedCart = { ...prev };
        delete updatedCart[itemId]; // Remove the item completely if the quantity becomes 0
        return updatedCart;
      }
    });
  
    // Update cart on the server if the user is authenticated
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
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

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(url+"/api/product/list");
      setAll_products(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.cartData); // Access response data
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };
  
  useEffect(() => {
    async function loadData() {
      fetchAllProducts();
  
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);  
      }
    }
  
    loadData();
  }, []);
  

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
    url, 
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
