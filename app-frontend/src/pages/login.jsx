import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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

        if (!formData.email || !formData.password) {
            setMessage("All fields are required");
            return;
        }

        // Temporary success
        setMessage("Login successful ✅");

        // Redirect to dashboard
        setTimeout(() => {
            navigate("/dashboard");
        }, 1000);

    }

}

export default Login;