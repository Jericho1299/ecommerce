import React, { useState } from "react";
import "../index.css";

const Login = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill all fields.");

    setLoading(true);
    try {
      const res = await fetch("http://localhost/finals/backend/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Login successful!");
        onLogin(data.user); // Pass user object to parent
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
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don’t have an account? <button onClick={onSwitch}>Register</button>
      </p>
    </div>
  );
};

export default Login;
