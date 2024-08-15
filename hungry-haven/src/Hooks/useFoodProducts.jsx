import { useState, useEffect } from "react";
import axios from "axios";

function useFoodProducts() {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState(null);
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
  return { foodItems, error };
}

export default useFoodProducts;
