import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

function Navbar({ setShowLoggedIn }) {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="logo">HungryHaven</h1>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact-Us
        </a>
      </ul>
      <div className="navbar-right">
        <i className="fa-solid fa-magnifying-glass"></i>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <i className="fa-solid fa-basket-shopping"></i>
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLoggedIn(true)}>Sign-in</button>
      </div>
    </div>
  );
}

export default Navbar;
