import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AddExpense = () => {

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    paymentMethod: "",
    date: "",
    about: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  // Saved The Expenses Funcation
  async function handleSubmit(e) {
    e.preventDefault();
    try {

      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:6060/expenses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const DataExp = await response.json();
      if (DataExp.success) {
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);

        setFormData({
          title: "",
          amount: "",
          paymentMethod: "",
          date: "",
          about: ""
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

      }
    } catch (error) {
      console.error("Error : In adding Expenses", error);
    }

  }



  return (
    <>

      <div className="form-box">
        <h2>Add Expense</h2>

        {showAlert && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <AlertTitle>Success</AlertTitle>
            Expense Saved Successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <label>Expense Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="e.g., Groceries, Fuel, Electricity Bill"
            required
            onChange={handleChange}
          />

          <label>Expense Amount (₹) *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            placeholder="Enter expense amount"
            required
            onChange={handleChange}
          />

          <label>Payment Method</label>
          <input
            type="text"
            name="paymentMethod"
            value={formData.paymentMethod}
            placeholder="Cash, UPI, Debit Card, Credit Card"
            onChange={handleChange}
          />

          <label>Expense Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <label>Expense Description</label>
          <textarea
            name="about"
            rows="3"
            value={formData.about}
            placeholder="Add notes or details about this expense"
            onChange={handleChange}
          ></textarea>

          <button type="submit" >Save</button>
        </form>
      </div>

    </>
  )
}


export default AddExpense;