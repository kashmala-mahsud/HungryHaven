import React, { useState } from "react";
import "./List.css";
import useFoodItems from "../../Hooks/useFoodItems";

function List() {
  const { list, error, removeFood, saveEdit } = useFoodItems(
    "http://localhost:4000/foodItems"
  );
  const [editingItem, setEditingItem] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (item) => {
    setEditedData(item);
    setEditingItem(item.id);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
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
    // const imageUrl = `${url}${item.url}`;
    // return imageUrl;
    return `http://localhost:4000${item.url}`;
  };
  if (error) {
    return <div>Error:{error}</div>;
  }

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
