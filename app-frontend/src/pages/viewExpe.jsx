import React, { useState, useEffect } from "react";

const TotalExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6060/expenses")
      .then((res) => res.json())
       .then((data) => {
        // Backend returns { success: true, data: [...] }
        if (data.success && Array.isArray(data.data)) {
          setExpenses(data.data);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  const now = new Date();

  const getDate = (exp) => {
    if (!exp.Date) return null;
    return new Date(exp.Date); // Use correct key
  };

  // All expenses
  const allExpensesTotal = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  // Monthly Total
  const monthlyTotal = expenses
    .filter((exp) => {
      const expDate = getDate(exp);
      return (
        expDate &&
        expDate.getMonth() === now.getMonth() &&
        expDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  // Daily Total
  const dailyTotal = expenses
    .filter((exp) => {
      const expDate = getDate(exp);
      return (
        expDate &&
        expDate.getDate() === now.getDate() &&
        expDate.getMonth() === now.getMonth() &&
        expDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
 <div className="expense-summary">
  <div className="total-box total-all">
    <h3>Total Expenses</h3>
    <p>₹ {allExpensesTotal}</p>
  </div>

  <div className="total-box total-month">
    <h3>This Month</h3>
    <p>₹ {monthlyTotal}</p>
  </div>

  <div className="total-box total-day">
    <h3>Today</h3>
    <p>₹ {dailyTotal}</p>
  </div>
</div>

  );
};

export default TotalExpenses;
