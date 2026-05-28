import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpendingLimits = () => {

  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [newBudget, setNewBudget] = useState("");

  const token = localStorage.getItem("token");

  // ================= FETCH EXPENSES =================
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

        const sorted = data.data.sort(
          (a, b) => new Date(b.Date) - new Date(a.Date)
        );

        setExpenses(sorted);
      }

    } catch (err) {

      console.log("Error fetching expenses:", err);

    }
  };

  // ================= FETCH BUDGET =================
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

        setTotalBudget(data.budget || 0);

      }

    } catch (err) {

      console.log("Error fetching budget:", err);

    }
  };

  // ================= SAVE BUDGET =================
  const handleBUdgetSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:6060/goals/spending-limit",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            category: "Total Budget",
            amount: Number(newBudget),
          }),
        }
      );

      const data = await res.json();

      console.log("SAVE BUDGET RESPONSE =", data);

      if (data.success) {

        alert("Budget Saved Successfully!");

        setNewBudget("");

        fetchBudget();

      } else {

        alert(data.message || "Budget save failed");

      }

    } catch (error) {

      console.log("Error saving budget:", error);

    }
  };

  // ================= LOAD DATA =================
  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExpenses();
    fetchBudget();

  }, []);

  // ================= TOTAL SPENT =================
  const spent = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const remaining = totalBudget - spent;

  return (

    <main className="container">

      {/* ================= OVERVIEW ================= */}
      <section className="card overview">

        <h2>Overview</h2>

        <div className="grid">

          <div className="stat">

            <div className="label">
              Total Budget
            </div>

            <div className="value">
              ₹ {totalBudget}
            </div>

          </div>

          <div className="stat">

            <div className="label">
              Spent
            </div>

            <div className="value spent">
              ₹ {spent}
            </div>

          </div>

          <div className="stat">

            <div className="label">
              Remaining
            </div>

            <div className="value remaining">
              ₹ {remaining}
            </div>

          </div>

        </div>

        {/* ================= BUDGET FORM ================= */}
        <form
          onSubmit={handleBUdgetSubmit}
          className="budget-form"
          style={{ marginTop: "15px" }}
        >

          <input
            type="number"
            placeholder="Enter Total Budget"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            required
            className="input"
          />

          <button
            type="submit"
            className="btn"
          >
            Save Budget
          </button>

        </form>

      </section>

      {/* ================= EXPENSE LIST ================= */}
      <section className="card recent">

        <h2>All Expenses</h2>

        {expenses.length === 0 ? (

          <p className="muted">
            No expenses yet
          </p>

        ) : (

          <div className="scroll-box">

            <ul className="list">

              {expenses.map((item) => (

                <li
                  className="list-item"
                  key={item._id}
                >

                  <div>

                    <strong>
                      {item.title}
                    </strong>

                    <div className="muted small">

                      {item.paymentMethod || "N/A"} •{" "}

                      {item.Date
                        ? new Date(item.Date).toLocaleDateString()
                        : "No Date"}

                    </div>

                  </div>

                  <div className="amount">
                    ₹ {item.amount}
                  </div>

                </li>

              ))}

            </ul>

          </div>

        )}

      </section>

      {/* ================= ACTION BUTTON ================= */}
      <section className="card actions">

        <button
          className="btn"
          onClick={() => navigate("/expenses/add")}
        >
          Add Expense
        </button>

      </section>

    </main>
  );
};

export default SpendingLimits;