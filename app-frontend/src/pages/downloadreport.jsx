import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DownloadReport = () => {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const now = new Date();

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetch("http://localhost:6060/expenses/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((res) => res.json())

      .then((data) => {

        console.log("PDF REPORT DATA =", data);

        if (data.success && Array.isArray(data.data)) {
          setExpenses(data.data);
        } else {
          setExpenses([]);
        }

      })

      .catch((err) => console.error("Fetch Error:", err))

      .finally(() => setLoading(false));

  }, []);

  // Current month expenses
  const monthlyExpenses = expenses.filter((exp) => {

    const d = exp.Date ? new Date(exp.Date) : null;

    return (
      d &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );

  });

  // Total amount
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  // Download PDF
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Monthly Expense Report", 14, 15);

    doc.setFontSize(12);

    doc.text(
      `Month: ${now.toLocaleString("default", {
        month: "long",
      })} ${now.getFullYear()}`,
      14,
      25
    );

    if (monthlyExpenses.length === 0) {

      doc.text("No expenses this month.", 14, 40);

      doc.save("Monthly_Expense_Report.pdf");

      return;
    }

    // Table
    autoTable(doc, {

      startY: 35,

      head: [["#", "Title", "Amount", "Payment Method", "Date"]],

      body: monthlyExpenses.map((exp, index) => [

        index + 1,

        exp.title,

        `Rs ${exp.amount}`,

        exp.paymentMethod || "N/A",

        exp.Date
          ? new Date(exp.Date).toLocaleDateString()
          : "No Date",

      ]),

    });

    // Total
    const finalY = doc.lastAutoTable.finalY || 40;

    doc.text(
      `Total Expenses: Rs ${monthlyTotal}`,
      14,
      finalY + 15
    );

    // Save PDF
    doc.save("Monthly_Expense_Report.pdf");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="download-container">

      <h2>Download Monthly Report</h2>

      <button
        className="download-btn"
        onClick={downloadPDF}
      >
        Download as PDF 📥
      </button>

    </div>

  );

};

export default DownloadReport;