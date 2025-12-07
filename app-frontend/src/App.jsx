import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./style/Navbar.css"
import "./style/Addexpes.css"
import "./style/Savinggoals.css"
import "./style/allnotes.css"
import "./style/spend.css"
import Navbar from "./components/Navbar"
// import AddExpense from "./pages/AddExpense"
import MonthlyTotal from "./pages/viewExpe"
import AddNote from "./pages/Addnotes"
import AddExpense from "./pages/AddExpense"
import TotalExpenses from "./pages/viewExpe"
import SavingGoals from "./pages/Savinggoals"
import AllNotes from "./pages/Allnotes"
import SpendingLimits from "./pages/spendLimt"
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes> 
          <Route path="/expenses/add" element={<AddExpense/>}/>
          {/* <Route path="/expenses/all" element={<MonthlyTotal/>}/> */}
          <Route path="/expenses/all" element={<TotalExpenses/>}/>
          <Route path="/notes/add" element={<AddNote/>}/>
          <Route path="/notes/all" element={<AllNotes/>}/>
          <Route path="/goals/saving" element={<SavingGoals/>}/>
          <Route path="/goals/spending-limit" element={<SpendingLimits/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
