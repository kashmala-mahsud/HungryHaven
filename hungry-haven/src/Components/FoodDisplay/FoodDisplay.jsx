import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
function FoodDisplay({category}) {
    const {foodItems} =useContext(StoreContext)
    console.log(foodItems);
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you!</h2>
       <div className="food-display-list">
        {foodItems.map((item, index)=>{
          if (category==="All" || category===item.category) {
            return <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price} image={item.url} />
          }
         })}
       </div>
    </div>
  )
}

export default FoodDisplay
