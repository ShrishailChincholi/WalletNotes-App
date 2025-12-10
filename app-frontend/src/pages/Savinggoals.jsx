import React, { useState, useEffect } from "react";

const SavingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    savedAmount: "",
  });

  async function loadGoals() {
    try {
      const response = await fetch("http://localhost:6060/goals/saving");
      const data = await response.json();
      console.log("Loaded Goals:", data);

      if (data.success && Array.isArray(data.data)) {
        setGoals(data.data);
      } else {
        setGoals([]);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
      setGoals([]);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadGoals();
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleEdite(goal) {
    setEditingId(goal.id);
    setFormData({
      title: goal.title,
      targetAmount: goal.targetAmount,
      savedAmount: goal.savedAmount,
    })
  }

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
        loadGoals();
      }
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  }

  return (
    <div className="goals-container">
      <h2>Saving Goals</h2>

      {/* Add Goal Form */}
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
            const target = Number(goal.targetAmount) || 0;
            const saved = Number(goal.savedAmount) || 0;
            const progress = target > 0 ? Math.min((saved / target) * 100, 100) : 0;

            return (
              <div className="goal-card" key={goal._id || index}>
                <h3>{goal.title}</h3>
                <p>₹{saved} / ₹{target}</p>
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
