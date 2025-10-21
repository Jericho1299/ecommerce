import React, { useState } from "react";
import "../index.css";

const Register = ({ onSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) return alert("Fill all fields.");

    setLoading(true);

    try {
      const res = await fetch("http://localhost/finals/backend/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Registered successfully! Please login.");
        onSwitch(); // Switch to Login form
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      alert("❌ Network error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p>
        Already have an account? <button onClick={onSwitch}>Login</button>
      </p>
    </div>
  );
};

export default Register;
