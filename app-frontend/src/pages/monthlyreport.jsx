import React, { useState, useEffect } from "react";

const MonthlyReport = () => {

  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetch(
      "http://localhost:6060/expenses/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

      .then((res) => res.json())

      .then((data) => {

        console.log("MONTH REPORT DATA =", data);

        if (
          data.success &&
          Array.isArray(data.data)
        ) {

          setExpenses(data.data);

        } else {

          setExpenses([]);

        }
      })

      .catch((err) =>
        console.error("Fetch Error:", err)
      );

  }, []);

  // ================= DATE =================
  const now = new Date();

  const currentMonth = now.toLocaleString(
    "default",
    { month: "long" }
  );

  // ================= GET DATE =================
  const getDate = (exp) =>
    exp.Date
      ? new Date(exp.Date)
      : null;

  // ================= MONTH FILTER =================
  const monthlyExpenses = expenses.filter((exp) => {

    const expDate = getDate(exp);

    return (
      expDate &&
      expDate.getMonth() === now.getMonth() &&
      expDate.getFullYear() === now.getFullYear()
    );
  });

  // ================= MONTH TOTAL =================
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, exp) =>
      sum + Number(exp.amount || 0),
    0
  );

  return (

    <div className="monthly-report-container">

      <h2>
        {currentMonth} Monthly Report
      </h2>

      {/* ================= TOTAL ================= */}
      <div className="monthly-total-box">

        <h3>Total Spent</h3>

        <p>
          ₹ {monthlyTotal}
        </p>

      </div>

      <h3 className="list-title">
        Expenses this Month
      </h3>

      {/* ================= NO DATA ================= */}
      {monthlyExpenses.length === 0 ? (

        <p className="no-data">
          No expenses this month
        </p>

      ) : (

        <ul className="expense-list">

          {monthlyExpenses.map((exp) => (

            <li
              key={exp._id}
              className="expense-item"
            >

              <div>

                <strong>
                  {exp.title}
                </strong>

                <p className="date">

                  {new Date(
                    exp.Date
                  ).toLocaleDateString()}

                </p>

              </div>

              <span className="amount">
                ₹ {exp.amount}
              </span>

            </li>

          ))}

        </ul>

      )}

    </div>
  );
};

export default MonthlyReport;