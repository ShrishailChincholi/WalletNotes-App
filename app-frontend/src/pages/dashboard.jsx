import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./Dashboard.css";

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savingGoals, setSavingGoals] = useState(0);
  const [spendingLimit, setSpendingLimit] = useState(0);
  const [notesCount, setNotesCount] = useState(0);

  // Fetch Total Expenses
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:6060/expenses/all");
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        const total = data.data.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
        setTotalExpenses(total);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Fetch Saving Goals Count
  const fetchSavingGoals = async () => {
    try {
      const res = await fetch("http://localhost:6060/goals/saving");
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setSavingGoals(data.data.length);
      }
    } catch (error) {
      console.error("Error fetching saving goals:", error);
    }
  };

  // Fetch Spending Limit
  const fetchBudget = async () => {
    try {
      const res = await fetch("http://localhost:6060/goals/spending-limit");
      const data = await res.json();

      if (data.success) {
        setSpendingLimit(data.budget || 0);
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  const fetchNotesCount = async () => {
    try {
      const res = await fetch("http://localhost:6060/notes/add");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotesCount(data.data.length);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExpenses();
    fetchSavingGoals();
    fetchBudget();
    fetchNotesCount();
  }, []);

  return (
    // <div className="dashboard-container">
    //   <h1 className="dashboard-title">Dashboard Overview</h1>

    //   <div className="cards-grid">
    //     <div className="card">
    //       <h3>Total Expenses</h3>
    //       <p>₹ {totalExpenses}</p>
    //     </div>

    //     <div className="card">
    //       <h3>Saving Goals</h3>
    //       <p>{savingGoals} Goals</p>
    //     </div>

    //     <div className="card">
    //       <h3>Spending Limit</h3>
    //       <p>₹ {spendingLimit}</p>
    //     </div>

    //     <div className="card">
    //       <h3>Total Notes</h3>
    //       <p>{notesCount} Notes</p>
    //     </div>
    //   </div>

    //   <div className="dashboard-btns">
    //     <Link to="/expenses/add" className="btn">Add Expense</Link>
    //     <Link to="/notes/add" className="btn">Add Notes</Link>
    //     <Link to="/goals/saving" className="btn">Saving Goals</Link>
    //     <Link to="/goals/spending-limit" className="btn">Budget Limit</Link>
    //   </div>
    // </div>
     <div className="dashboard-container-dash">
      <h1 className="dashboard-title-dash">Dashboard Overview</h1>

      <div className="cards-grid-dash">
        <div className="card-dash">
          <h3>Total Expenses</h3>
          <p>₹ {totalExpenses}</p>
        </div>

        <div className="card-dash">
          <h3>Saving Goals</h3>
          <p>{savingGoals} Goals</p>
        </div>

        <div className="card-dash">
          <h3>Spending Limit</h3>
          <p>₹ {spendingLimit}</p>
        </div>

        <div className="card-dash">
          <h3>Total Notes</h3>
          <p>{notesCount} Notes</p>
        </div>
      </div>

      <div className="dashboard-btns-dash">
        <Link to="/expenses/add" className="btn-dash">Add Expense</Link>
        <Link to="/notes/add" className="btn-dash">Add Notes</Link>
        <Link to="/goals/saving" className="btn-dash">Saving Goals</Link>
        <Link to="/goals/spending-limit" className="btn-dash">Budget Limit</Link>
      </div>
    </div>
  );

};

export default Dashboard;
