import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./style/Navbar.css"
import "./style/Addexpes.css"
import "./style/Savinggoals.css"
import Navbar from "./components/Navbar"
// import AddExpense from "./pages/AddExpense"
import MonthlyTotal from "./pages/viewExpe"
import AddNote from "./pages/Addnotes"
import AddExpense from "./pages/AddExpense"
import TotalExpenses from "./pages/viewExpe"
import SavingGoals from "./pages/Savinggoals"
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
          <Route path="/goals/saving" element={<SavingGoals/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
