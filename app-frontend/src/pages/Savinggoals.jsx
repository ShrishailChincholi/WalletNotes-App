import React, { useState, useEffect } from "react";


const SavingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    savedAmount: "",
  });

  // Fetch goals
  async function loadGoals() {
    try {
      const response = await fetch("http://localhost:6060/goals/saving");
      const data = await response.json();
      if (data.success) setGoals(data.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  }

  useEffect(() => {
    loadGoals();
  }, []);

  // Handle form change
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6060/goals/saving", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (resData.success) {
        alert("Goal Added Successfully!");
        setFormData({ title: "", targetAmount: "", savedAmount: "" });
        loadGoals(); // Refresh list
      }
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  }

  return (
    <div className="goals-container">
      <h2>Saving Goals</h2>

      {/* Form */}
      <form className="goal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Goal Title"
          value={formData.title}
          required
          onChange={handleChange}
        />

        <input
          type="number"
          name="targetAmount"
          placeholder="Target Amount (₹)"
          value={formData.targetAmount}
          required
          onChange={handleChange}
        />

        <input
          type="number"
          name="savedAmount"
          placeholder="Saved Amount (₹)"
          value={formData.savedAmount}
          required
          onChange={handleChange}
        />

        <button type="submit">Add Goal</button>
      </form>

      {/* Goals List */}
      <div className="goals-list">
        {goals.length === 0 ? (
          <p>No saving goals yet.</p>
        ) : (
          goals.map((goal, index) => {
            const target = Number(goal.targetAmount);
            const saved = Number(goal.savedAmount);
            const progress = target > 0 ? (saved / target) * 100 : 0;

            return (
              <div className="goal-card" key={goal._id || index}>
                <h3>{goal.title}</h3>
                <p>
                  ₹{saved} / ₹{target}
                </p>

                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="progress-text">{Math.floor(progress)}%</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SavingGoals;
