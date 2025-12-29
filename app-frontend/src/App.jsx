import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./style/Navbar.css"
import "./style/Addexpes.css"
import "./style/Savinggoals.css"
import "./style/allnotes.css"
import "./style/spend.css"
import "./style/month.css"
import "./style/download.css"
import "./style/dashboard.css"
import "./style/login&page.css"
import "./style/login.css"
import "./style/Account.css"

import AddExpense from "./pages/AddExpense"
import TotalExpenses from "./pages/viewExpe"
import SavingGoals from "./pages/Savinggoals"
import AllNotes from "./pages/Allnotesa"
import SpendingLimits from "./pages/spendLimt"
import MonthlyReport from "./pages/monthlyreport"
import DownloadReport from "./pages/downloadreport"
import Dashboard from "./pages/dashboard"
import Register from "./pages/login&page"
import AuthLayout from "./layout/AuthLayout"
import MainLayout from "./layout/MainLayout"
import Login from "./pages/login"
import AddNote from "./pages/Addnotes"
import Account from "./pages/Account"
import EditProfile from "./pages/editeprofile"

// Main Page 


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>


          <Route element={<AuthLayout />}>
            <Route path="/Register" element={<Register />} />
            <Route path="/" element={<Login />} />
          </Route>


          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses/add" element={<AddExpense />} />
            <Route path="/expenses/all" element={<TotalExpenses />} />
            <Route path="/notes/add" element={<AddNote />} />
            <Route path="/goals/saving" element={<SavingGoals />} />
            <Route path="/goals/spending-limit" element={<SpendingLimits />} />
            <Route path="/reports/monthly" element={<MonthlyReport />} />
            <Route path="/reports/pdf" element={<DownloadReport />} />
            <Route path="/notes/all" element={<AllNotes />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/edit" element={<EditProfile />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

