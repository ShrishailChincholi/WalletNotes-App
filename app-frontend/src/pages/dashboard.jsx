import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savingGoals, setSavingGoals] = useState(0);
  const [spendingLimit, setSpendingLimit] = useState(0);
  const [notesCount, setNotesCount] = useState(0);

  // TOKEN
  const token = localStorage.getItem("token");

  // ================= EXPENSES =================
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:6060/expenses/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("EXPENSE DATA =", data);
      if (data.success && Array.isArray(data.data)) {
        const total = data.data.reduce(
          (sum, exp) => sum + Number(exp.amount || 0),
          0
        );
        setTotalExpenses(total);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // ================= GOALS =================
  const fetchSavingGoals = async () => {
    try {
      const res = await fetch("http://localhost:6060/goals/saving", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("GOALS DATA =", data);
      if (data.success && Array.isArray(data.data)) {
        setSavingGoals(data.data.length);
      }
    } catch (error) {
      console.error("Error fetching saving goals:", error);
    }
  };

  // ================= BUDGET =================
  const fetchBudget = async () => {
    try {
      const res = await fetch("http://localhost:6060/goals/spending-limit", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("BUDGET DATA =", data);
      if (data.success) {
        setSpendingLimit(data.budget || 0);
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  // ================= NOTES =================
  const fetchNotesCount = async () => {
    try {
      const res = await fetch("http://localhost:6060/notes/add", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("NOTES DATA =", data);
      if (data.success && Array.isArray(data.data)) {
        setNotesCount(data.data.length);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // ================= LOAD ALL =================
  useEffect(() => {
    fetchExpenses();
    fetchSavingGoals();
    fetchBudget();
    fetchNotesCount();
  }, []);

  // ================= UI =================
  return (
    <div className="dashboard-container-dash">
      {/* ---------- HEADER ---------- */}
      <div className="dashboard-header-dash">
        <div>
          <h1 className="dashboard-title-dash">Welcome back 👋</h1>
          <p className="dashboard-subtitle-dash">
            Here's your financial overview at a glance.
          </p>
        </div>
        <div className="dashboard-date-dash">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* ---------- STAT CARDS ---------- */}
      <div className="cards-grid-dash">
        <div className="card-dash card-expense">
          <div className="card-icon-dash">💰</div>
          <div className="card-body-dash">
            <h3>Total Expenses</h3>
            <p>₹ {totalExpenses.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <div className="card-dash card-goals">
          <div className="card-icon-dash">🎯</div>
          <div className="card-body-dash">
            <h3>Saving Goals</h3>
            <p>{savingGoals} Goals</p>
          </div>
        </div>

        <div className="card-dash card-budget">
          <div className="card-icon-dash">📊</div>
          <div className="card-body-dash">
            <h3>Spending Limit</h3>
            <p>₹ {spendingLimit.toLocaleString("en-IN")}</p>
          </div>
        </div>

        <div className="card-dash card-notes">
          <div className="card-icon-dash">📝</div>
          <div className="card-body-dash">
            <h3>Total Notes</h3>
            <p>{notesCount} Notes</p>
          </div>
        </div>
      </div>

      {/* ---------- QUICK ACTIONS ---------- */}
      <div className="quick-actions-dash">
        <h2>Quick Actions</h2>
        <div className="dashboard-btns-dash">
          <Link to="/expenses/add" className="btn-dash btn-expense">
            <span className="btn-icon">➕</span> Add Expense
          </Link>
          <Link to="/notes/add" className="btn-dash btn-notes">
            <span className="btn-icon">📝</span> Add Notes
          </Link>
          <Link to="/goals/saving" className="btn-dash btn-goals">
            <span className="btn-icon">🎯</span> Saving Goals
          </Link>
          <Link to="/goals/spending-limit" className="btn-dash btn-budget">
            <span className="btn-icon">📊</span> Budget Limit
          </Link>
        </div>
      </div>

      {/* ---------- MOTIVATIONAL FOOTER ---------- */}
      <div className="dashboard-footer-dash">
        <p>
          💡 <strong>Tip:</strong> Track your expenses regularly to stay on top
          of your savings goals!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;