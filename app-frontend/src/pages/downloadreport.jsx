import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Correct import

const DownloadReport = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const now = new Date();

  useEffect(() => {
    fetch("http://localhost:6060/expenses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExpenses(data);
        } else if (data.success && Array.isArray(data.data)) {
          setExpenses(data.data);
        }
      })
      .catch((err) => console.error("Fetch Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const monthlyExpenses = expenses.filter((exp) => {
    const d = exp.Date ? new Date(exp.Date) : null;
    return (
      d &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  const monthlyTotal = monthlyExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Monthly Expense Report", 14, 15);
    doc.text(
      `Month: ${now.toLocaleString("default", { month: "long" })} ${now.getFullYear()}`,
      14,
      25
    );

    if (monthlyExpenses.length === 0) {
      doc.text("No expenses this month.", 14, 35);
      return doc.save("Monthly_Expense_Report.pdf");
    }

    autoTable(doc, {
      head: [["#", "Title", "Amount", "Method", "Date"]],
      body: monthlyExpenses.map((exp, i) => [
        i + 1,
        exp.title,
        exp.amount,
        exp.Paymentmethoda || "N/A",
        exp.Date ? new Date(exp.Date).toLocaleDateString() : "No Date",
      ]),
      startY: 35,
    });

    const endY = doc.lastAutoTable.finalY || 40;
    doc.text(`Total: ₹ ${monthlyTotal}`, 14, endY + 10);

    doc.save("Monthly_Expense_Report.pdf");
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="download-container">
      <h2>Download Monthly Report</h2>

      <button className="download-btn" onClick={downloadPDF}>
        Download as PDF 📥
      </button>
    </div>
  );
};

export default DownloadReport;
