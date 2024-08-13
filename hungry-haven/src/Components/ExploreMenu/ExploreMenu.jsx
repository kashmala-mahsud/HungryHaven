import React, { useEffect, useState } from "react";
import "./ExploreMenu.css";
import axios from "axios";

function ExploreMenu({category, setCategory}) {
  const [images, setImages]=useState([]);
  const [error,setError]= useState(null);

  useEffect(()=>{
    const fetchImages=async ()=>{
      try {
        const response= await axios.get("http://localhost:4000/images");
        setImages(response.data);
       

      } catch (error) {
        setError(error.message);
        console.error("Error fetching the images", error);
      
      }
    };
    fetchImages();
  }, []);
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error soluta
        ratione distinctio vel voluptatum esse eos earum debitis veritatis.
      </p>
      <div className="explore-menu-list">

        {images.map((image)=>(
    <div key={image.id} className="explore-menu-list-item" onClick={()=>setCategory(prev=>prev===image.text? "All": image.text)}>
              <img className={category === image.text?"active":""} src={image.url} alt={image.id} style={{height:"100px", width:"100px", borderRadius:"50px"}}/>
              <p>{image.text}</p>
            </div>
          )
        )}
        </div>
        <hr />
    </div>
  );
}

export default ExploreMenu;
