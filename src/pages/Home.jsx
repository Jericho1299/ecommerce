import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <h1 className="logo">
          Urban <span>Kicks</span>
        </h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <button className="logout-btn" onClick={() => alert("Logged out!")}>
          Logout
        </button>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Step into Style</h1>
          <p>Discover performance and comfort in every stride.</p>
          <Link to="/shop">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </div>
      </section>

      <footer>© 2025 Urban Kicks. All rights reserved.</footer>
    </div>
  );
};

export default Home;
