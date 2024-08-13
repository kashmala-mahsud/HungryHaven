import React from "react";
import "./HomePage.css";
import Header from "../../Components/Header/Header";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";

function HomePage() {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
}

export default HomePage;
