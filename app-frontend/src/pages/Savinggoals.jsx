import React, { useState, useEffect } from "react";

const SavingGoals = () => {
  const [goals, setGoals] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    savedAmount: "",
  });

  // GET TOKEN
  const token = localStorage.getItem("token");

  // LOAD GOALS
  async function loadGoals() {
    try {
      console.log("TOKEN =", token);

      const response = await fetch("http://localhost:6060/goals/saving", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("STATUS =", response.status);

      const data = await response.json();

      // console.log("GOALS DATA =", data);

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

  // HANDLE INPUT
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // EDIT
  function handleEdite(goal) {
    setEditingId(goal._id);

    setFormData({
      title: goal.title,
      targetAmount: goal.targetAmount,
      savedAmount: goal.savedAmount,
    });
  }

  // UPDATE GOAL
  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:6060/goals/saving/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      // console.log("UPDATE DATA =", data);

      if (data.success) {
        // alert("Goal Updated Successfully!");

        setEditingId(null);

        setFormData({
          title: "",
          targetAmount: "",
          savedAmount: "",
        });

        loadGoals();
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log("Update Error =", error);
    }
  }

  // ADD GOAL
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:6060/goals/saving",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const resData = await response.json();

      // console.log("ADD DATA =", resData);

      if (resData.success) {
        alert("Goal Added Successfully!");

        setFormData({
          title: "",
          targetAmount: "",
          savedAmount: "",
        });

        loadGoals();
      } else {
        alert(resData.message);
      }

    } catch (error) {
      console.error("Error adding goal:", error);
    }
  }

  // DELETE GOAL
  async function handleDelete(id) {

    if (!window.confirm("Are you sure you want to delete this goal?")) {
      return;
    }

    try {

      const res = await fetch(
        `http://localhost:6060/goals/saving/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("DELETE DATA =", data);

      if (data.success) {

        alert("Goal Deleted!");

        if (editingId === id) {
          setEditingId(null);

          setFormData({
            title: "",
            targetAmount: "",
            savedAmount: "",
          });
        }

        loadGoals();

      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error("Delete Error =", err);
    }
  }

  return (
    <div className="goals-container">

      <h2>Saving Goals</h2>

      {/* FORM */}
      <form
        className="goal-form"
        onSubmit={editingId ? handleUpdate : handleSubmit}
      >

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
          placeholder="Target Amount"
          value={formData.targetAmount}
          required
          onChange={handleChange}
        />

        <input
          type="number"
          name="savedAmount"
          placeholder="Saved Amount"
          value={formData.savedAmount}
          required
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Goal" : "Add Goal"}
        </button>

      </form>

      {/* GOALS LIST */}
      <div className="goals-list">

        {goals.length > 0 ? (
          goals.map((goal) => {

            const progress =
              goal.targetAmount > 0
                ? Math.min(
                    (goal.savedAmount / goal.targetAmount) * 100,
                    100
                  )
                : 0;

            return (
              <div className="goal-card" key={goal._id}>

                <h3>{goal.title}</h3>

                <p>
                  ₹{goal.savedAmount} / ₹{goal.targetAmount}
                </p>

                {/* PROGRESS BAR */}
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>

                <p className="progress-text">
                  {Math.floor(progress)}%
                </p>

                {/* BUTTONS */}
                <button
                  className="edit-btn"
                  onClick={() => handleEdite(goal)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(goal._id)}
                >
                  Delete
                </button>

              </div>
            );
          })
        ) : (
          <p>No Goals Found</p>
        )}

      </div>
    </div>
  );
};

export default SavingGoals;