import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useFoodItems(url) {
  const [error, setError] = useState(null);
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem("foodItems");
    return savedList ? JSON.parse(savedList) : [];
  });
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(url);
        if (("fetching data", response.data)) {
          setList(response.data);
        } else {
          console.log("No data received");
        }
      } catch (error) {
        console.error("Error fetching list");
        setError("Error fetching list");
      }
    };
    fetchList();
  }, [url]);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/${foodId}`);
      if (response.status === 200) {
        toast.success("Food item removed successfully");
        await fetchList();
        const updatedList = list.filter((item) => item.id !== foodId);
        setList(updatedList);
        localStorage.setItem("foodItems", JSON.stringify(updatedList));
      } else {
        console.log("Error removing food item");
      }
    } catch (error) {
      toast.error("Error during removal");
    }
  };
  const saveEdit = async (itemId, editedData) => {
    try {
      const response = await axios.put(`${url}/${itemId}`, editedData);
      if (response.status === 200) {
        toast.success("Item updated successfully");
        fetchList(); //refresh the list
        const updatedList = list.map((item) =>
          item.id === itemId ? { ...item, ...editedData } : item
        );
        setList(updatedList);
        localStorage.setItem("foodItems", JSON.stringify(updatedList));
      } else {
        console.log("Error updating item");
      }
    } catch (error) {
      toast.error("Error updating item");
    }
  };

  useEffect(() => {
    fetchList();
  }, [url]);
  return { list, error, removeFood, saveEdit };
}

export default useFoodItems;
