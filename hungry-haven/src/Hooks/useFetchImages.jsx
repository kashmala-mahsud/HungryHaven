import axios from "axios";
import { useEffect, useState } from "react";
const useFetchImages = (url) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(url);
        if (response.data) {
          setImages(response.data);
        } else {
          console.log("No data received");
        }
      } catch (error) {
        setError("Error fetching Images");
        console.error("Error fetching images");
      }
    };
    fetchImages();
  }, [url]);

  return { images, error };
};

export default useFetchImages;
