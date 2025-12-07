import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpendingLimits = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);

  // Fetch all expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:6060/api/expenses");
      const data = await res.json();
      if (data.success) {
        setExpenses(data.data);
      }
    } catch (err) {
      console.log("Error fetching expenses:", err);
    }
  };

  // Fetch the set budget (saved in backend)
  const fetchBudget = async () => {
    try {
      const res = await fetch("http://localhost:6060/goals/spending-limit");
      const data = await res.json();
      if (data.success) {
        setTotalBudget(data.budget);
      }
    } catch (err) {
      console.log("Error fetching budget:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExpenses();
    fetchBudget();
  }, []);

  // Calculate total spent
  const spent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalBudget - spent;

  return (
    <main className="container">
      <section className="card overview">
        <h2>Overview</h2>
        <div className="grid">
          <div className="stat">
            <div className="label">Total Budget</div>
            <div className="value">₹ {totalBudget}</div>
          </div>
          <div className="stat">
            <div className="label">Spent</div>
            <div className="value spent">₹ {spent}</div>
          </div>
          <div className="stat">
            <div className="label">Remaining</div>
            <div className="value remaining">₹ {remaining}</div>
          </div>
        </div>
      </section>

      <section className="card recent">
        <h2>Recent Expenses</h2>

        {expenses.length === 0 ? (
          <p className="muted">No expenses yet</p>
        ) : (
          <ul className="list">
            {expenses.slice(-3).reverse().map((item) => (
              <li className="list-item" key={item._id}>
                <div>
                  <strong>{item.title}</strong>
                  <div className="muted small">{item.category}</div>
                </div>
                <div className="amount">₹ {item.amount}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card actions">
        <button className="btn" onClick={() => navigate("/expenses/add")}>
          Add Expense
        </button>
      </section>
    </main>
  );
};

export default SpendingLimits;
