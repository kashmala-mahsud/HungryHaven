import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./List.css";

function List() {
  const [list, setList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedData, setEditedData] = useState({});

  const url = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/foodItems`);
      if (("fetching data", response.data)) {
        setList(response.data);
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.error("Error fetching list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/foodItems/${foodId}`);
      if (response.status === 200) {
        toast.success("Food item removed successfully");
        await fetchList();
      } else {
        console.log("Error removing food item");
      }
    } catch (error) {
      toast.error("Error during removal");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  const handleEditClick = (item) => {
    setEditedData(item);
    setEditingItem(item.id);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };
  const saveEdit = async (itemId) => {
    try {
      const response = await axios.put(
        `${url}/foodItems/${itemId}`,
        editedData
      );
      if (response.status === 200) {
        toast.success("Item updated successfully");
        setEditingItem(null); //stop editing mode
        fetchList(); //refresh the list
      } else {
        console.log("Error updating item");
      }
    } catch (error) {
      toast.error("Error updating item");
    }
  };
  const cancelEdit = () => {
    setEditingItem(null);
    setEditedData({});
  };

  const getImageSrc = (item) => {
    // Check if the item has a valid URL and if it's an external link
    if (item.url && item.url.startsWith("data:")) {
      return item.url;
    }
    // Otherwise, assume it's a local path and prepend the base URL
    const imageUrl = `${url}${item.url}`;
    return imageUrl;
  };

  return (
    <div className="list add flex-col">
      <p>All Food Items</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img
                src={getImageSrc(item)}
                style={{ height: "50px", width: "50px" }}
              />
              {editingItem === item.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="category"
                    value={editedData.category}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="price"
                    value={editedData.price}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => saveEdit(item.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <div className="actions">
                    <span
                      className="cursor"
                      onClick={() => handleEditClick(item)}
                    >
                      <i
                        className="fa-solid fa-pencil-alt"
                        style={{
                          color: "lightblue",
                          fontSize: "16px",
                          paddingRight: "10px",
                        }}
                      ></i>
                    </span>
                    <span
                      onClick={() => removeFood(item.id)}
                      className="cursor"
                      style={{ color: "red", fontSize: "16px" }}
                    >
                      X
                    </span>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>
    </div>
  );
}

export default List;
