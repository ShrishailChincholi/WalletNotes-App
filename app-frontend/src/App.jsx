import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./style/Navbar.css"
import "./style/Addexpes.css"
import "./style/Savinggoals.css"
import "./style/allnotes.css"
import "./style/spend.css"
import "./style/month.css"
import "./style/download.css"
import "./style/dashboard.css"
import Navbar from "./components/Navbar"
import AddNote from "./pages/Addnotes"
import AddExpense from "./pages/AddExpense"
import TotalExpenses from "./pages/viewExpe"
import SavingGoals from "./pages/Savinggoals"
import AllNotes from "./pages/Allnotes"
import SpendingLimits from "./pages/spendLimt"
import MonthlyReport from "./pages/monthlyreport"
import DownloadReport from "./pages/downloadreport"
import Dashboard from "./pages/dashboard"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes> 
           <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/expenses/add" element={<AddExpense/>}/>
          <Route path="/expenses/all" element={<TotalExpenses/>}/>
          <Route path="/notes/add" element={<AddNote/>}/>
          <Route path="/notes/all" element={<AllNotes/>}/>
          <Route path="/goals/saving" element={<SavingGoals/>}/>
          <Route path="/goals/spending-limit" element={<SpendingLimits/>}/>
          <Route path="/reports/monthly" element={<MonthlyReport/>}/>
          <Route path="/reports/pdf" element={<DownloadReport/>}/>
         
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

