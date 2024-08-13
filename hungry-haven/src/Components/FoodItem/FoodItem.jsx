import React, { useContext } from 'react';
import "./FoodItem.css";
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, image, price, description, name }) => {
  const { cartItems, addToCart , removeFromCart} = useContext(StoreContext)


  return (
    <div className='food-items'>
      <div className="food-item-img-container">
        <img 
          className="food-item-image" 
          src={image} 
          alt={name} 
          style={{ height: "200px", width: "200px" }} 
        />
        <div className="food-item-counter">
          <button className="counter-button-incr" onClick={()=>addToCart(id)} style={{backgroundColor:"green"}}>+</button>
        {cartItems[id] > 0 && (
            <>
              <span className="item-count">{cartItems[id]}</span>
              <button className="counter-button-decr" onClick={()=>removeFromCart(id)}>-</button>
            </>
          )}
        </div>
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="food-item-rating">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;