import { createContext, useState } from "react";
import useFoodProducts from "../Hooks/useFoodProducts";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const { foodItems, error } = useFoodProducts();
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmout = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodItems.find((product) => product.id === item);
        totalAmout += itemInfo.price * cartItems[item];
      }
    }

    return totalAmout;
  };
  return (
    <StoreContext.Provider
      value={{
        foodItems,
        error,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
