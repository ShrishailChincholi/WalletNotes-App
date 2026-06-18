import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ openRegister }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:6060/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login Successful ✅");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      console.error(error);
      setMessage("Server Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">
          <h2>Welcome Back 👋</h2>
          <p>Login to your Wallet Note Tracker account</p>
        </div>

        {message && (
          <p className="message">{message}</p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>

          <p className="auth-switch">
            Don't have an account?{" "}
            <span
              onClick={openRegister}
              style={{
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Register
            </span>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Login;