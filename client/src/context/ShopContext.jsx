import { createContext, useState } from "react"
import { all_products } from "../assets/data"

export const ShopContext  = createContext(null)

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({})

    const addToCart =(itemId) => {
      if (!cartItems[itemId]) {
        setCartItems((prev)=>({...prev,[itemId]:1 }))
        
      } else {
        setCartItems((prev)=>({...prev,[itemId]: prev[itemId]+1 }))
      }
    }
    const removeFromCart =(itemId) => {
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1 }))
    } 
    const contextValue =  {all_products, cartItems, setCartItems, removeFromCart, addToCart}
  return (
<ShopContext.Provider value={contextValue}>
    {props.children}
</ShopContext.Provider>
  )
}

export default ShopContextProvider