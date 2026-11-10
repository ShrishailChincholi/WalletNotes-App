
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import "./style/Navbar.css";
import "./style/Addexpes.css";
import "./style/Savinggoals.css";
import "./style/allnotes.css";
import "./style/spend.css";
import "./style/month.css";
import "./style/download.css";
import "./style/dashboard.css";
import "./style/login&page.css";
import "./style/login.css";
import "./style/Account.css";
import "./style/editeprofile.css";
import "./style/home.css";

// Layouts
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/login&page";
import Dashboard from "./pages/dashboard";

import AddExpense from "./pages/AddExpense";
import TotalExpenses from "./pages/viewExpe";

import AddNote from "./pages/Addnotes";
import AllNotes from "./pages/Allnotes";

import SavingGoals from "./pages/Savinggoals";
import SpendingLimits from "./pages/spendLimt";

import MonthlyReport from "./pages/monthlyreport";
import DownloadReport from "./pages/downloadreport";

import Account from "./pages/Account";
import EditProfile from "./pages/editeprofile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected / Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Expenses */}
          <Route path="/expenses/add" element={<AddExpense />} />
          <Route path="/expenses/all" element={<TotalExpenses />} />

          {/* Notes */}
          <Route path="/notes/add" element={<AddNote />} />
          <Route path="/notes/all" element={<AllNotes />} />

          {/* Goals */}
          <Route path="/goals/saving" element={<SavingGoals />} />
          <Route
            path="/goals/spending-limit"
            element={<SpendingLimits />}
          />

          {/* Reports */}
          <Route path="/reports/monthly" element={<MonthlyReport />} />
          <Route path="/reports/pdf" element={<DownloadReport />} />

          {/* Account */}
          <Route path="/account" element={<Account />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
