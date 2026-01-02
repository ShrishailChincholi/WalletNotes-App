import React, { useState, useEffect } from "react";

const MonthlyReport = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6060/expenses/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setExpenses(data.data);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  // Get a Date and Time
  const now = new Date();
  const currentMonth = now.toLocaleString("default", { month: "long" });

  const getDate = (exp) => (exp.Date ? new Date(exp.Date) : null);

  const monthlyExpenses = expenses.filter((exp) => {
    const expDate = getDate(exp);
    return (
      expDate &&
      expDate.getMonth() === now.getMonth() &&
      expDate.getFullYear() === now.getFullYear()
    );
  });

  const monthlyTotal = monthlyExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  return (
    <div className="monthly-report-container">
      <h2>{currentMonth} Monthly Report</h2>

      <div className="monthly-total-box">
        <h3>Total Spent</h3>
        <p>₹ {monthlyTotal}</p>
      </div>

      <h3 className="list-title">Expenses this Month</h3>

      {monthlyExpenses.length === 0 ? (
        <p className="no-data">No expenses this month</p>
      ) : (
        <ul className="expense-list">
          {monthlyExpenses.map((exp) => (
            <li key={exp._id} className="expense-item">
              <div>
                <strong>{exp.title}</strong>
                <p className="date">
                  {new Date(exp.Date).toLocaleDateString()}
                </p>
              </div>
              <span className="amount">₹ {exp.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MonthlyReport;
