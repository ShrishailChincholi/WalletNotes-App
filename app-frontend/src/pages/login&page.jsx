import React, { useState } from "react";
import Alert from "@mui/material/Alert";

const Register = ({ openLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:6060/api/auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSeverity("success");
        setMessage("Registration Successful ✅");

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          if (openLogin) {
            openLogin()
          }
        }, 1000);
      } else {
        setSeverity("error");
        setMessage(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      setSeverity("error");
      setMessage("Server Error");
    }

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join Wallet Note Tracker and start managing your finances.</p>
        </div>

        <form onSubmit={handleSubmit}>

          {message && (
            <Alert severity={severity} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Create Account
          </button>

          <p className="auth-switch">
            Already have an account?{" "}
            <span
              onClick={openLogin}
              style={{
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Login
            </span>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Register;