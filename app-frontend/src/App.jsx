import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./style/Navbar.css"
import "./style/Addexpes.css"
import AddExpense from "./pages/AddExpense"
import Navbar from "./components/Navbar"
import MonthlyTotal from "./pages/viewExpe"
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/expenses/add" element={<AddExpense />} />
          <Route path="/expenses/all" element={<MonthlyTotal/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
