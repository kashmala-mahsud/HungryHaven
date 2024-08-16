import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function useAddFoodItems() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const addFoodItem = async (data, image) => {
    setLoading(true);
    setError(null);
    const url = "http://localhost:4000";
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = async () => {
        const imageBase64 = reader.result;

        const payload = {
          ...data,
          price: Number(data.price),
          category: data.category, // Use the selected category
          url: imageBase64,
        };

        try {
          const response = await axios.post(`${url}/foodItems`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 201) {
            toast.success("Submission successfully");
            setLoading(false);
            return true;
          } else {
            throw new Error("Error: Submission failed");
          }
        } catch (error) {
          toast.error("Error during submission:");

          setLoading(false);
          return false;
        }
      };

      reader.onerror = (error) => {
        console.error("Error converting image:", error);
        toast.error("Error converting image");
        setLoading(false);
      };
    } else {
      toast.error("No image selected");
      return false;
    }
  };
  return { addFoodItem, loading, error };
}

export default useAddFoodItems;
