import React, { useState, useEffect } from "react";

const TotalExpenses = () => {

  const [expenses, setExpenses] = useState([]);

  // TOKEN
  const token = localStorage.getItem("token");

  useEffect(() => {

    fetch("http://localhost:6060/expenses/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((res) => res.json())

      .then((data) => {

        console.log("EXPENSE DATA =", data);

        // Backend returns:
        // { success: true, data: [...] }

        if (data.success && Array.isArray(data.data)) {

          setExpenses(data.data);

        } else {

          setExpenses([]);
        }
      })

      .catch((err) =>
        console.error("Fetch Error:", err)
      );

  }, []);

  const now = new Date();

  // DATE FUNCTION
  const getDate = (exp) => {

    if (!exp.Date) return null;

    return new Date(exp.Date);
  };

  // ================= TOTAL =================
  const allExpensesTotal = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  // ================= MONTHLY =================
  const monthlyTotal = expenses

    .filter((exp) => {

      const expDate = getDate(exp);

      return (
        expDate &&
        expDate.getMonth() === now.getMonth() &&
        expDate.getFullYear() === now.getFullYear()
      );
    })

    .reduce(
      (sum, exp) => sum + Number(exp.amount || 0),
      0
    );

  // ================= DAILY =================
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

    .reduce(
      (sum, exp) => sum + Number(exp.amount || 0),
      0
    );

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