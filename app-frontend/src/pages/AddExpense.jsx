import React, { useState } from 'react'

const AddExpense = () => {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        paymentMethod: "",
        date: "",
        about: "",
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    

    async function handleSubmit(e) {
        e.preventDefault();
        try {
      const response = await fetch("http://localhost:6060/expenses/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const DataExp = await response.json();
      if (DataExp.success) {
        alert("Expense Saved Successfully!");
        setFormData({
          title: "",
          amount: "",
          paymentMethod: "",
          date: "",
          about: ""
        });
      }
    } catch (error) {
      console.error("Error : In adding Expenses", error);
    }
  }



return (
    <>

       <div className="form-box">
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <label>Title *</label>
        <input type="text" name="title" value={formData.title}
          placeholder="Enter title" required onChange={handleChange} />

        <label>Amount *</label>
        <input type="number" name="amount" value={formData.amount}
          placeholder="Enter amount" required onChange={handleChange} />

        <label>Payment Method</label>
        <input type="text" name="paymentMethod" value={formData.paymentMethod}
          placeholder="Cash / Card / UPI" onChange={handleChange} />

        <label>Date</label>
        <input type="date" name="date" value={formData.date}
          onChange={handleChange} />

        <label>About</label>
        <textarea name="about" rows="3" value={formData.about}
          placeholder="Write details..." onChange={handleChange}></textarea>

        <button type="submit">Save</button>
      </form>
    </div>

    </>
)
}


export default AddExpense;