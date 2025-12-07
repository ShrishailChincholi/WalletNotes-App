import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpendingLimits = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [newBudget, setNewBudget] = useState("");

  // Fetch all expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:6060/expenses");
      const data = await res.json();
      console.log("Fetched Expenses:", data);

      if (data.success && Array.isArray(data.data)) {
        // Sort newest first
        const sorted = data.data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setExpenses(sorted);
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
        console.log(data.budget);
      }
    } catch (err) {
      console.log("Error fetching budget:", err);
    }
  };

  // POST: SAVE NEW TOTAL Budget
  const handleBUdgetSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:6060/goals/spending-limit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget: Number(newBudget) }),
      });

      const data = await res.json();
      if (data.success) {
        setTotalBudget(data.budget);
        setNewBudget("");
        alert("Budget Saved Successfully!");
      }
    } catch (error) {
      console.log("Error saving budget:", error);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExpenses();
    fetchBudget();
  }, []);

  // Calculate total spent
 const spent = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const remaining = totalBudget - spent;
  console.log("Spent:", spent, "Remaining:", remaining);

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

        {/* >>> Set Budget Form >>> */}
        <form onSubmit={handleBUdgetSubmit} className="budget-form" style={{ marginTop: "15px" }}>
          <input
            type="number"
            placeholder="Enter Total Budget"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="btn">
            Save Budget
          </button>
        </form>
      </section>

     <section className="card recent">
  <h2>All Expenses</h2>

  {expenses.length === 0 ? (
    <p className="muted">No expenses yet</p>
  ) : (
    <div className="scroll-box">
      <ul className="list">
        {expenses.map((item) => (
          <li className="list-item" key={item._id}>
            <div>
              <strong>{item.title}</strong>
              <div className="muted small">
                {item.paymentMethod || "N/A"} •{" "}
                {item.Date
                  ? new Date(item.Date).toLocaleDateString()
                  : "No Date"}
              </div>
            </div>
            <div className="amount">₹ {item.amount}</div>
          </li>
        ))}
      </ul>
    </div>
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
