import React, {  } from 'react'

const AddExpense = () => {
    // const [expData, setExpData] = useState({

    // })

    return (
        <>

            <div className="form-box" style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", background: "white", borderRadius: "10px", boxShadow: "0 0 10px #ccc" }}>
                <h2>Expense Form</h2>

                <label>
                    Title *
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        required
                    />
                </label>

                <label>
                    Amount *
                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        required
                    />
                </label>

                <label>
                    Payment Method
                    <input
                        type="text"
                        name="paymentMethod"
                        placeholder="Cash / Card / UPI"
                    />
                </label>

                <label>
                    Date
                    <input
                        type="date"
                        name="date"
                    />
                </label>

                <label>
                    About
                    <textarea
                        name="about"
                        rows="3"
                        placeholder="Write details..."
                    ></textarea>
                </label>

                <button
                    style={{ padding: "10px 20px", background: "blue", color: "white", border: "none", borderRadius: "6px", marginTop: "10px" }}
                >
                    Save
                </button>
            </div>

        </>
    )
}


export default AddExpense;