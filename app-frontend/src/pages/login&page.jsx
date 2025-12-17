import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
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
        try {
            const res = await fetch("http://localhost:6060/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("✅ Registration successful");
                setFormData({ name: "", email: "", password: "" });
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ Server error");
        }
    }

}

export default Register