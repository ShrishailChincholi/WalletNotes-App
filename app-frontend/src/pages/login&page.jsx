import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });


    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const navigate = useNavigate();

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
                setMessage("Registration successfull!")
                setFormData({ name: "", email: "", password: "" });
                navigate("/");

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                });

                setTimeout(() => {
                    navigate("/");
                }, 2000);

            } else {
                setSeverity("error");
                setMessage(data.message || "Registration failed");
            }
        } catch (error) {
            console.error(error);
            setSeverity("error");
            setMessage("❌ Server error");
        }
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                {message && (
                    <Alert
                        severity={severity}
                        sx={{ mb: 2, width: "100%" }}
                    >
                        {message}
                    </Alert>
                )}

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>

                <p className='auth-switch'>
                    I have already have an account ?
                    <Link to='/'>Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;