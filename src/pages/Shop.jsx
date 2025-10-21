import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Shop = () => {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "Air Stride Runner",
        price: 4899,
        image:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
        category: "men",
      },
      {
        id: 2,
        name: "Urban Flow X",
        price: 5599,
        image:
          "https://images.unsplash.com/photo-1600181950921-3ed6c8b1b8b4?auto=format&fit=crop&w=800&q=80",
        category: "men",
      },
      {
        id: 3,
        name: "Velocity Edge",
        price: 4999,
        image:
          "https://images.unsplash.com/photo-1606813907291-6460d2a50e58?auto=format&fit=crop&w=800&q=80",
        category: "women",
      },
      {
        id: 4,
        name: "StreetFlex 2000",
        price: 3999,
        image:
          "https://images.unsplash.com/photo-1584735174644-7a0aa5f64cf0?auto=format&fit=crop&w=800&q=80",
        category: "women",
      },
      {
        id: 5,
        name: "Urban Kicks Pro",
        price: 5499,
        image:
          "https://images.unsplash.com/photo-1606811852951-9b37d5d5d5df?auto=format&fit=crop&w=800&q=80",
        category: "men",
      },
      {
        id: 6,
        name: "Motion Lite",
        price: 3499,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        category: "children",
      },
      {
        id: 7,
        name: "Zoom Dash",
        price: 4599,
        image:
          "https://images.unsplash.com/photo-1618354691373-d851c9b213c1?auto=format&fit=crop&w=800&q=80",
        category: "men",
      },
      {
        id: 8,
        name: "FlexiGo Kidz",
        price: 2999,
        image:
          "https://images.unsplash.com/photo-1528701800489-20be0b1e8d2a?auto=format&fit=crop&w=800&q=80",
        category: "children",
      },
      {
        id: 9,
        name: "CloudWave 360",
        price: 4799,
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        category: "women",
      },
    ];

    setProducts(mockProducts);
  }, []);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <div>
      {/* 🧭 Navbar */}
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

      {/* 🧍 Category Filter */}
      <div className="category-filter">
        <button
          onClick={() => setCategory("all")}
          className={category === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setCategory("men")}
          className={category === "men" ? "active" : ""}
        >
          Men
        </button>
        <button
          onClick={() => setCategory("women")}
          className={category === "women" ? "active" : ""}
        >
          Women
        </button>
        <button
          onClick={() => setCategory("children")}
          className={category === "children" ? "active" : ""}
        >
          Children
        </button>
      </div>

      {/* 🛍️ Products Section */}
      <section className="products">
        <h2>Shop All Sneakers</h2>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="info">
                <h3>{product.name}</h3>
                <p>₱{product.price.toLocaleString()}</p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>© 2025 Urban Kicks. All rights reserved.</footer>
    </div>
  );
};

export default Shop;
