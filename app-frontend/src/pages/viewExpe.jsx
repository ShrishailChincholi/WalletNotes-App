import React, { useState, useEffect } from "react";

const MonthlyTotal = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch all expenses from backend
    fetch("http://localhost:6060/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);

  // Calculate current month total dynamically
  const currentMonthTotal = expenses
    .filter((exp) => {
      const expDate = new Date(exp.date);
      const now = new Date();
      return (
        expDate.getMonth() === now.getMonth() &&
        expDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className="total-box">
      <h3>Monthly Total Expense</h3>
      <p>₹ {currentMonthTotal}</p>
    </div>
  );
};

export default MonthlyTotal;
