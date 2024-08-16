import { useState } from "react";
import "./Add.css";

import useAddFoodItems from "../../Hooks/useAddFoodItems";

function Add() {
  const { addFoodItem, loading } = useAddFoodItems();
  const [image, setImage] = useState(null); // Initially null, not false
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Cake", // Default category
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const isSuccess = await addFoodItem(data, image);
    if (isSuccess) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Cake",
      });
      setImage(null);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : null}
              style={{ height: "100px", width: "100px" }}
            />
            {!image && (
              <i
                className="fa-solid fa-cloud-arrow-up"
                style={{ height: "100px", width: "100px", paddingTop: "20px" }}
              ></i>
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category} // Bind to state
              required
            >
              <option value="Cake">Cake</option>
              <option value="Desert">Desert</option>
              <option value="Beef">Beef</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Salad">Salad</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
}

export default Add;
