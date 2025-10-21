import React, { useState, useEffect } from "react";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [cart, setCart] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [message, setMessage] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [showPurchasedDropdown, setShowPurchasedDropdown] = useState(false);
  const [user, setUser] = useState(null); // logged-in user

  // Shoes collection
  const shoes = [
    { id: 1, name: "NB 1906R Grey", price: 8990, image: "https://images.unsplash.com/photo-1618354691373-d851c9b21b6b?w=800", desc: "A modern running classic with breathable mesh and vintage-inspired details." },
    { id: 2, name: "NB 2002R Protection Pack", price: 9990, image: "https://images.unsplash.com/photo-1625841652103-1ec7c2ff7cf5?w=800", desc: "Deconstructed suede overlays meet premium cushioning for ultimate comfort." },
    { id: 3, name: "NB 550 White Green", price: 8490, image: "https://images.unsplash.com/photo-1649771894794-703f9e3b3a0a?w=800", desc: "A basketball icon reborn with retro 80s charm and everyday wearability." },
    { id: 4, name: "NB 9060 Cream Beige", price: 10490, image: "https://images.unsplash.com/photo-1677756111567-9dbd3b0d43e8?w=800", desc: "Chunky design meets futuristic silhouette for that street-ready statement." },
    { id: 5, name: "Onitsuka Tiger Mexico 66", price: 5990, image: "https://images.unsplash.com/photo-1589181069955-68b13e8c8c3c?w=800", desc: "Retro-inspired casual sneakers with timeless style." },
    { id: 6, name: "Nike Dunk Low", price: 7990, image: "https://images.unsplash.com/photo-1618354691400-d851c9b21b6b?w=800", desc: "Classic low-top silhouette with vibrant colorways." },
    { id: 7, name: "Nike Air Jordans", price: 11990, image: "https://images.unsplash.com/photo-1618354691500-d851c9b21b6b?w=800", desc: "Iconic basketball shoes with premium leather." },
    { id: 8, name: "Asics Kayano Gel", price: 6990, image: "https://images.unsplash.com/photo-1618354691600-d851c9b21b6b?w=800", desc: "High-performance running shoes with GEL cushioning." },
  ];

  // Load cart from backend
  const loadCart = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost/finals/backend/api/cart_get.php?user_id=${user.id}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  // Load orders from backend
  const loadOrders = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost/finals/backend/api/orders_get.php?user_id=${user.id}`);
      const data = await res.json();
      setPurchased(data);
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
  };

  useEffect(() => {
    if (user) {
      loadCart();
      loadOrders();
    }
  }, [user]);

  // Add shoe to cart in backend
  const addToCart = async (shoe) => {
    if (!user) return alert("Login first!");
    try {
      const res = await fetch("http://localhost/finals/backend/api/cart_add.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          product_id: shoe.id,
          product_name: shoe.name,
          product_price: shoe.price,
          product_image: shoe.image,
          quantity: 1
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`${shoe.name} added to cart!`);
        loadCart();
        setTimeout(() => setMessage(""), 2000);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  // Remove cart item in backend
  const removeFromCart = async (id) => {
    try {
      const res = await fetch("http://localhost/finals/backend/api/cart_delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) loadCart();
      else alert(data.message);
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  // Checkout cart
  const checkout = async () => {
    if (!cart.length) return alert("Your cart is empty!");
    try {
      const res = await fetch("http://localhost/finals/backend/api/checkout.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id })
      });
      const data = await res.json();
      if (data.success) {
        setCheckoutSuccess(true);
        loadCart();
        loadOrders();
        setTimeout(() => setCheckoutSuccess(false), 2500);
      } else alert(data.message);
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCart([]);
    setPurchased([]);
    setActivePage("home");
  };

  // Page rendering
  const renderPage = () => {
    switch (activePage) {
      case "shop":
        return (
          <section className="shop">
            <h2>Shop Collection</h2>
            <div className="shoe-grid">
              {shoes.map(shoe => (
                <div key={shoe.id} className="shoe-card">
                  <img src={shoe.image} alt={shoe.name} />
                  <h3>{shoe.name}</h3>
                  <p>₱{shoe.price}</p>
                  <div className="card-buttons">
                    <button onClick={() => addToCart(shoe)}>Add to Cart</button>
                    <button className="buy-btn" onClick={() => { addToCart(shoe); checkout(); }}>Buy Now</button>
                    <button className="view-btn" onClick={() => setSelectedShoe(shoe)}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case "cart":
        return (
          <section className="cart-page">
            <h2>Your Cart</h2>
            {!cart.length ? <p>Your cart is empty.</p> :
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.product_image} alt={item.product_name} />
                    <div className="cart-info">
                      <h3>{item.product_name}</h3>
                      <p>₱{item.product_price}</p>
                      <label>Qty:</label>
                      <input type="number" min="1" value={item.quantity} readOnly />
                    </div>
                    <div className="crud-buttons">
                      <button onClick={() => removeFromCart(item.id)}>Delete</button>
                    </div>
                  </div>
                ))}
                <h3>Total: ₱{cart.reduce((sum, i) => sum + i.product_price * i.quantity, 0)}</h3>
                <button className="checkout-btn" onClick={checkout}>Checkout</button>
              </div>}
          </section>
        );
      default:
        return (
          <section className="home">
            <div className="hero">
              <div className="overlay"></div>
              <div className="hero-text">
                <h1>Urban Kicks</h1>
                <p>Step up your style game with the freshest drops.</p>
                <button onClick={() => setActivePage("shop")} className="shop-now-btn">Shop Now</button>
              </div>
            </div>
          </section>
        );
    }
  };

  // Show login/register if not logged in
  if (!isLoggedIn) {
    return isRegistering ?
      <Register onSwitch={() => setIsRegistering(false)} /> :
      <Login onLogin={(u) => { setIsLoggedIn(true); setUser(u); loadCart(); loadOrders(); }} onSwitch={() => setIsRegistering(true)} />;
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo"><span>Urban</span> Kicks</div>
        <div className="nav-buttons">
          <button onClick={() => setActivePage("home")}>Home</button>
          <button onClick={() => setActivePage("shop")}>Shop</button>
          <button onClick={() => setActivePage("cart")}>🛒 {cart.reduce((a, c) => a + c.quantity, 0)}</button>
          <button onClick={() => setShowPurchasedDropdown(!showPurchasedDropdown)}>🛍️</button>
          <button onClick={handleLogout}>Logout</button>
        </div>

        {showPurchasedDropdown &&
          <div className="purchased-dropdown">
            <h4>Purchased Items</h4>
            {!purchased.length ? <p>No items yet.</p> :
              purchased.map(item => (
                <div key={item.id} className="dropdown-item">
                  <img src={item.product_image} alt={item.product_name} />
                  <div>
                    <h5>{item.product_name}</h5>
                    <p>₱{item.product_price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
          </div>
        }
      </nav>

      {message && <div className="toast">{message}</div>}
      {renderPage()}

      {selectedShoe &&
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedShoe(null)}>&times;</span>
            <img src={selectedShoe.image} alt={selectedShoe.name} />
            <h2>{selectedShoe.name}</h2>
            <p>{selectedShoe.desc}</p>
            <h3>₱{selectedShoe.price}</h3>
            <button onClick={() => { addToCart(selectedShoe); setSelectedShoe(null); }}>Add to Cart</button>
            <button className="buy-btn" onClick={() => { addToCart(selectedShoe); checkout(); setSelectedShoe(null); }}>Buy Now</button>
          </div>
        </div>
      }

      {checkoutSuccess &&
        <div className="checkout-modal">
          <div className="checkout-box">
            <div className="checkmark">✅</div>
            <h2>Payment Successful!</h2>
            <p>Items moved to your purchase history.</p>
          </div>
        </div>
      }

      <footer>© 2025 Urban Kicks — All Rights Reserved.</footer>
    </>
  );
};

export default App;
