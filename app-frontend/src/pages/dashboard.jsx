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

      const res = await fetch(
        "http://localhost:6060/expenses/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

      const res = await fetch(
        "http://localhost:6060/goals/saving",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

      const res = await fetch(
        "http://localhost:6060/goals/spending-limit",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

      const res = await fetch(
        "http://localhost:6060/notes/add",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("NOTES DATA =", data);

      // FIXED
      if (data.success && Array.isArray(data.data)) {

        setNotesCount(data.data.length);

        console.log("Notes Count =", data.data.length);
      }

    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // ================= LOAD ALL =================
  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExpenses();
    fetchSavingGoals();
    fetchBudget();
    fetchNotesCount();

  }, []);

  return (

    <div className="dashboard-container-dash">

      <h1 className="dashboard-title-dash">
        Dashboard Overview
      </h1>

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

        <Link to="/expenses/add" className="btn-dash">
          Add Expense
        </Link>

        <Link to="/notes/add" className="btn-dash">
          Add Notes
        </Link>

        <Link to="/goals/saving" className="btn-dash">
          Saving Goals
        </Link>

        <Link to="/goals/spending-limit" className="btn-dash">
          Budget Limit
        </Link>

      </div>

    </div>
  );
};

export default Dashboard;