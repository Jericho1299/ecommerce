import React from "react";
import "../index.css";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">Urban<span>Kicks</span></h1>
      <ul>
        <li><button className="cat-btn">Men</button></li>
        <li><button className="cat-btn">Women</button></li>
        <li><button className="cat-btn">Kids</button></li>
        <li><button onClick={onLogout} className="cat-btn logout">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
