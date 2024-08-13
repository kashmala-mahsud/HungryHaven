import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/foodItems");
        setFoodItems(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching the images", error);
      }
    };
    fetchFoodItems();
  }, []);
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
