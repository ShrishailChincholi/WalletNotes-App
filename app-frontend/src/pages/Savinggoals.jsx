import React, { useState } from "react";


const SavingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    savedAmount: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newGoal = {
      ...formData,
      id: Date.now(),
    };
    setGoals([...goals, newGoal]);

    setFormData({
      title: "",
      targetAmount: "",
      savedAmount: "",
    });
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
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="targetAmount"
          placeholder="Target Amount (₹)"
          value={formData.targetAmount}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="savedAmount"
          placeholder="Saved Amount (₹)"
          value={formData.savedAmount}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Goal</button>
      </form>

      {/* Display Goals */}
      <div className="goals-list">
        {goals.map((goal) => {
          const progress =
            (Number(goal.savedAmount) / Number(goal.targetAmount)) * 100;

          return (
            <div className="goal-card" key={goal.id}>
              <h3>{goal.title}</h3>
              <p>
                Saved: ₹{goal.savedAmount} / ₹{goal.targetAmount}
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
        })}
      </div>
    </div>
  );
};

export default SavingGoals;
