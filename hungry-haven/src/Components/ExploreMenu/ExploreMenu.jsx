import React from "react";
import "./ExploreMenu.css";
import useFetchImages from "../../Hooks/useFetchImages";

function ExploreMenu({ category, setCategory }) {
  const { images, error } = useFetchImages("http://localhost:4000/images");
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error soluta
        ratione distinctio vel voluptatum esse eos earum debitis veritatis.
      </p>
      <div className="explore-menu-list">
        {images.map((image) => (
          <div
            key={image.id}
            className="explore-menu-list-item"
            onClick={() =>
              setCategory((prev) => (prev === image.text ? "All" : image.text))
            }
          >
            <img
              className={category === image.text ? "active" : ""}
              src={image.url}
              alt={image.id}
              style={{ height: "100px", width: "100px", borderRadius: "50px" }}
            />
            <p>{image.text}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
